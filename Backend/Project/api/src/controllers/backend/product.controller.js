const productModal = require("../../models/product")
var slugify = require('slugify');
const subSubCategoryModal = require("../../models/subSubCategory");
const colorModal = require("../../models/color");
const materialModal = require("../../models/material");

const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};

exports.viewSubSubCategories = async(request, response) => {

    const andCondition = [
        {
            deleted_at : null, 
        }
    ];

    const orCondition = [{
        status : 1
    }];

    if(request.body){
        if(request.body.parent_category_id != undefined){
            if(request.body.parent_category_id != ''){
                andCondition.push({ parent_category_id : request.body.parent_category_id })
            }
        }

        if(request.body.sub_category_id != undefined){
            if(request.body.sub_category_id != ''){
                andCondition.push({ sub_category_id : request.body.sub_category_id })
            }
        }
    }

    if(andCondition.length > 0){
        var filter = { $and : andCondition }
    } else {
        var filter = {}
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    await subSubCategoryModal.find(filter)
    .select('name parent_category_id sub_category_id')
    .sort({
        _id : 'desc'
    })
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record found successfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record found.',
                _data : result
            }

            response.send(data);
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong',
            _error : error,
            _data : []
        }

        response.send(data);
    })
}

exports.viewMaterials = async(request, response) => {

    const andCondition = [
        {
            deleted_at : null, 
        }
    ];

    const orCondition = [{
        status : 1
    }];

    if(andCondition.length > 0){
        var filter = { $and : andCondition }
    } else {
        var filter = {}
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    await materialModal.find(filter)
    .select('name')
    .sort({
        _id : 'desc'
    })
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record found successfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record found.',
                _data : result
            }

            response.send(data);
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong',
            _error : error,
            _data : []
        }

        response.send(data);
    })
}

exports.viewColors = async(request, response) => {

    const andCondition = [
        {
            deleted_at : null, 
        }
    ];

    const orCondition = [{
        status : 1
    }];

    if(andCondition.length > 0){
        var filter = { $and : andCondition }
    } else {
        var filter = {}
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    await colorModal.find(filter)
    .select('name')
    .sort({
        _id : 'desc'
    })
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record found successfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record found.',
                _data : result
            }

            response.send(data);
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong',
            _error : error,
            _data : []
        }

        response.send(data);
    })
}

exports.create = async (request, response) => {

    const saveData = request.body

    // if(request.file){
    //     saveData.image = request.file.filename
    // }

    if(request.body != undefined){
        if(request.body.name != undefined || request.body.name != ''){
            var slug = slugify(request.body.name, {
                lower : true,
                strict : true
            })

            saveData.slug = await generateUniqueSlug(productModal, slug)
        }
    }

    await productModal(saveData).save()
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record created successfully !!',
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        var errorMessages = {};
        for( var i in error.errors){
            errorMessages[i] = error.errors[i].message;
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errorMessages,
            _data : null
        }

        response.send(data)
    })
}

exports.view = async(request, response) => {

    var page    = 1;
    var limit   = 15;
    var skip    = 0;

    if(request.body){
        if(request.body.limit){
            limit = request.body.limit; 
        }

        if(request.body.page){
            page = request.body.page;
            skip = (page - 1) * limit;
        }
    }

    const andCondition = [
        {
            deleted_at : null, 
            // status : 1   // when create api for website
        }
    ];

    const orCondition = [];

    if(request.body){
        if(request.body.name != undefined){
            if(request.body.name != ''){
                name = new RegExp(request.body.name,"i")
                andCondition.push({ name : name })
            }
        }
    }

    if(andCondition.length > 0){
        var filter = { $and : andCondition }
    } else {
        var filter = {}
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    var total_records = await productModal.find(filter).countDocuments();

    await productModal.find(filter).limit(limit).skip(skip)
    // .select('name image slug status order')
    .populate('material_id', 'name')
    .populate('color_id', 'name')
    .populate('parent_category_id', 'name')
    .populate('sub_category_id', 'name')
    .populate('sub_sub_category_id', 'name')
    .sort({
        // order : 'asc',   in case of website
        _id : 'desc'
    })
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record found successfully.',
                _image_path : process.env.product_image,
                _paginate : {
                    total_records : total_records,
                    current_page : page,
                    total_pages : Math.ceil(total_records/limit)
                },
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record found.',
                _data : result
            }

            response.send(data);
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong',
            _error : error,
            _data : []
        }

        response.send(data);
    })
}

exports.update = async(request, response) => {
    const saveData = request.body

    if(request.file){
        saveData.image = request.file.filename
    }

    var slug = slugify(request.body.name, {
        lower : true,
        strict : true
    })

    saveData.slug = await generateUniqueSlug(productModal, slug)

    await productModal.updateOne({
        _id : request.params.id
    }, {
        $set : saveData
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record updated successfully !!',
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        var errorMessages = {};
        for( var i in error.errors){
            errorMessages[i] = error.errors[i].message;
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errorMessages,
            _data : null
        }

        response.send(data)
    })
}

exports.details = async(request, response) => {
    await productModal.findOne({
        _id : request.params.id,
        deleted_at : null
    })
    .then((result) => {
        if(result){
            const data = {
                _status : true,
                _message : 'Record found successfully.',
                _image_path : process.env.product_image,
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record found.',
                _data : result
            }

            response.send(data);
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong',
            _error : error,
            _data : null
        }

        response.send(data);
    })
}

exports.changeStatus = async(request, response) => {
    await productModal.updateMany({
        _id : request.body.ids
    }, [{
        $set : {
            status : {
                $not : "$status"
            }
        }
    }])
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Status changed successfully !!',
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        var errorMessages = {};
        for( var i in error.errors){
            errorMessages[i] = error.errors[i].message;
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errorMessages,
            _data : null
        }

        response.send(data)
    })
}

exports.destroy = async(request, response) => {
    await productModal.updateMany({
        _id : request.body.ids
    }, {
        $set : {
            deleted_at : Date.now()
        }
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record deleted successfully !!',
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        var errorMessages = {};
        for( var i in error.errors){
            errorMessages[i] = error.errors[i].message;
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errorMessages,
            _data : null
        }

        response.send(data)
    })
}