const { categories, brands } = require("../apiData");

exports.categories = (request, response) => {
    if(categories.length > 0){
        const data = {
            _status : true,
            _message : 'Record fetch succussfully !',
            _data : categories
        }
        response.send(data);
    } else {
        const data = {
            _status : false,
            _message : 'No record found !',
            _data : []
        }
        response.send(data);
    }
}

exports.brands = (request, response) => {
    if(brands.length > 0){
        const data = {
            _status : true,
            _message : 'Record fetch succussfully !',
            _data : brands
        }
        response.send(data);
    } else {
        const data = {
            _status : false,
            _message : 'No record found !',
            _data : []
        }
        response.send(data);
    }
}