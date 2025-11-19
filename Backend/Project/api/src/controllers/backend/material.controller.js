const materialModal = require("../../models/material")

exports.create = async (request, response) => {

    const saveData = request.body

    await materialModal(saveData).save()
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

    var total_records = await materialModal.find(filter).countDocuments();

    await materialModal.find(filter).limit(limit).skip(skip)
    .select('name status order')
    .sort({
        // order : 'asc',   in case of website
        _id : 'desc'
    })
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record found successfully.',
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

    await materialModal.updateOne({
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
    await materialModal.findOne({
        _id : request.params.id
    })
    .then((result) => {
        if(result){
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
            _data : null
        }

        response.send(data);
    })
}

exports.changeStatus = async(request, response) => {
    await materialModal.updateMany({
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
    await materialModal.updateMany({
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