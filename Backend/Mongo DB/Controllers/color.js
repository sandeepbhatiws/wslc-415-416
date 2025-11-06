const database = require('../config/database.js');
const mongodb = require('mongodb');

exports.create = async(request, response) => {
    try {
        const db = await database();
        db.collection('colors').insertOne({
            name : request.query.color_name,
            code : request.query.color_code
        })
        .then((result) => {
            const data = {
                _status : true,
                _message : 'Record create succussfully !!',
                _data : result
            }

            response.send(data);
        })
        .catch(() => {
            const data = {
                _status : false,
                _message : 'Something went wrong !!',
                _data : null
            }

            response.send(data);
        })
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    }
}

exports.view = async (request, response) => {
    try {
        const db = await database();
        db.collection('colors').find().toArray()
        .then((result) => {
            if(result.length > 0){
                const data = {
                    _status : true,
                    _message : 'Record found succussfully !!',
                    _data : result
                }

                response.send(data);  
            } else {
                const data = {
                    _status : false,
                    _message : 'No record found !!',
                    _data : [] 
                }

                response.send(data);  
            }
        })
        .catch(() => {
            const data = {
                _status : false,
                _message : 'Something went wrong !!',
                _data : [] 
            }

            response.send(data);  
        })
        
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : [] 
        }

        response.send(data);   
    }
}

exports.details = async (request, response) => {
    try {
        const db = await database();
        db.collection('colors').findOne({
            _id : new mongodb.ObjectId(request.params.id)
        })
        .then((result) => {
            if(result){
                const data = {
                    _status : true,
                    _message : 'Record found succussfully !!',
                    _data : result
                }

                response.send(data);  
            } else {
                const data = {
                    _status : false,
                    _message : 'No record found !!',
                    _data : null
                }

                response.send(data);  
            }
        })
        .catch(() => {
            const data = {
                _status : false,
                _message : 'Something went wrong !!',
                _data : null
            }

            response.send(data);  
        })
        
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);   
    }
}