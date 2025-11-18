const defaultModal = require("../../models/default")

exports.create = async (request, response) => {

    const saveData = {
        name : request.body.name,
        order : request.body.order
    }

    await defaultModal(saveData).save()
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record created successfully !!',
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {

        // var errorMessages = [];
        // for( var i in error.errors){
        //     // console.log(error.errors[i].message);
        //     errorMessages.push(error.errors[i].message);
        // }

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

    // await defaultModal.find().sort({
    //     _id : 'desc'
    // })

    var page = 1;
    var limit = 5;
    var skip = 0;

    if(request.body){
        if(request.body.limit){
            limit = request.body.limit; 
        }

        if(request.body.page){
            page = request.body.page;
            skip = (page - 1) * limit;
        }
    }

    // var nameRegex = new RegExp(request.body.name,"i")

    const filter ={
        deleted_at : null,
        // name : nameRegex,
        // order : {
        //     $gte : 3
        // },
        status : {
            $type :8
        }
    }

    var total_records = await defaultModal.find(filter).countDocuments();

    await defaultModal.find(filter).limit(limit).skip(skip)
    .select('name status order')
    .sort({
        order : 'asc',
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

exports.update = () => {
    
}

exports.details = () => {
    
}

exports.changeStatus = () => {
    
}

exports.destroy = () => {
    
}