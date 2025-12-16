const userModal = require("../../models/user")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.register = async (request, response) => {

    checkEmail = await userModal.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(checkEmail){
        const data = {
            _status : false,
            _message : 'Email Id already exit !!',
            _data : null
        }

        response.send(data)
    }

    dataSave = request.body;
    dataSave.role_type = 'user';
    dataSave.password = await bcrypt.hash(request.body.password, saltRounds);

    userModal(dataSave).save()
    .then((result) => {

        token = jwt.sign({ uerInfo : result } , process.env.secret_key);

        const data = {
            _status : true,
            _message : 'Register user successfully !',
            _token : token,
            _data : result
        }

        response.send(data)
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data)
    });
};

exports.login = async (request, response) => {
    checkEmail = await userModal.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(!checkEmail){
        const data = {
            _status : false,
            _message : 'Email Id doest not exit !!',
            _data : null
        }

        response.send(data)
    }

    var checkPassword = await bcrypt.compare(request.body.password, checkEmail.password);
    
    if(!checkPassword){
        const data = {
            _status : false,
            _message : 'Password is incorrect !!',
            _data : null
        }

        response.send(data)
    }

    if(checkEmail.status == 0){
        const data = {
            _status : false,
            _message : 'Your account is deactivated. Please contact support !!',
            _data : null
        }

        response.send(data)
    }

    token = jwt.sign({ uerInfo : checkEmail } , process.env.secret_key);

    const data = {
        _status : true,
        _message : 'Login successfully !',
        _token : token,
        _data : checkEmail
    }

    response.send(data)
};

exports.viewProfile = async(request, response) => {

    var token = request.headers.authorization.split(' ');
    var decoded = jwt.verify(token[1], process.env.secret_key);
    
    await userModal.findOne({
        _id : decoded.uerInfo._id,
        deleted_at : null
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
                _data : null
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

exports.updateProfile = async(request, response) => {

    var token = request.headers.authorization.split(' ');
    var decoded = jwt.verify(token[1], process.env.secret_key);

    const saveData = request.body

    await userModal.updateOne({
        _id : decoded.uerInfo._id
    }, {
        $set : saveData
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Update profile successfully !!',
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


// exports.create = async (request, response) => {

//     const saveData = request.body

//     await colorModal(saveData).save()
//     .then((result) => {
//         const data = {
//             _status : true,
//             _message : 'Record created successfully !!',
//             _data : result
//         }

//         response.send(data)
//     })
//     .catch((error) => {
//         var errorMessages = {};
//         for( var i in error.errors){
//             errorMessages[i] = error.errors[i].message;
//         }

//         const data = {
//             _status : false,
//             _message : 'Something went wrong !!',
//             _error : errorMessages,
//             _data : null
//         }

//         response.send(data)
//     })
// }

// exports.view = async(request, response) => {

//     var page    = 1;
//     var limit   = 15;
//     var skip    = 0;

//     if(request.body){
//         if(request.body.limit){
//             limit = request.body.limit; 
//         }

//         if(request.body.page){
//             page = request.body.page;
//             skip = (page - 1) * limit;
//         }
//     }

//     const andCondition = [
//         {
//             deleted_at : null, 
//             // status : 1   // when create api for website
//         }
//     ];

//     const orCondition = [];

//     if(request.body){
//         if(request.body.name != undefined){
//             if(request.body.name != ''){
//                 name = new RegExp(request.body.name,"i")
//                 andCondition.push({ name : name })
//             }
//         }

//         if(request.body.code != undefined){
//             if(request.body.code != ''){
//                 code = new RegExp(request.body.code,"i")
//                 andCondition.push({ code : code })
//             }
//         }
//     }

//     if(andCondition.length > 0){
//         var filter = { $and : andCondition }
//     } else {
//         var filter = {}
//     }

//     if(orCondition.length > 0){
//         filter.$or = orCondition;
//     }

//     var total_records = await colorModal.find(filter).countDocuments();

//     await colorModal.find(filter).limit(limit).skip(skip)
//     .select('name code status order')
//     .sort({
//         // order : 'asc',   in case of website
//         _id : 'desc'
//     })
//     .then((result) => {
//         if(result.length > 0){
//             const data = {
//                 _status : true,
//                 _message : 'Record found successfully.',
//                 _paginate : {
//                     total_records : total_records,
//                     current_page : page,
//                     total_pages : Math.ceil(total_records/limit)
//                 },
//                 _data : result
//             }

//             response.send(data);
//         } else {
//             const data = {
//                 _status : false,
//                 _message : 'No Record found.',
//                 _data : result
//             }

//             response.send(data);
//         }
//     })
//     .catch((error) => {
//         const data = {
//             _status : false,
//             _message : 'Something went wrong',
//             _error : error,
//             _data : []
//         }

//         response.send(data);
//     })
// }





// exports.changeStatus = async(request, response) => {
//     await colorModal.updateMany({
//         _id : request.body.ids
//     }, [{
//         $set : {
//             status : {
//                 $not : "$status"
//             }
//         }
//     }])
//     .then((result) => {
//         const data = {
//             _status : true,
//             _message : 'Status changed successfully !!',
//             _data : result
//         }

//         response.send(data)
//     })
//     .catch((error) => {
//         var errorMessages = {};
//         for( var i in error.errors){
//             errorMessages[i] = error.errors[i].message;
//         }

//         const data = {
//             _status : false,
//             _message : 'Something went wrong !!',
//             _error : errorMessages,
//             _data : null
//         }

//         response.send(data)
//     })
// }

// exports.destroy = async(request, response) => {
//     await colorModal.updateMany({
//         _id : request.body.ids
//     }, {
//         $set : {
//             deleted_at : Date.now()
//         }
//     })
//     .then((result) => {
//         const data = {
//             _status : true,
//             _message : 'Record deleted successfully !!',
//             _data : result
//         }

//         response.send(data)
//     })
//     .catch((error) => {
//         var errorMessages = {};
//         for( var i in error.errors){
//             errorMessages[i] = error.errors[i].message;
//         }

//         const data = {
//             _status : false,
//             _message : 'Something went wrong !!',
//             _error : errorMessages,
//             _data : null
//         }

//         response.send(data)
//     })
// }