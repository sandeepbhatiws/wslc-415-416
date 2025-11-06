module.exports = (request, response, next) => {
    if(!request.query.api_key || !request.query.password){
        const data = {
            _status : false,
            _message : 'Required field missing !',
            _data : []
        }
        response.send(data);
    } else if(request.query.api_key != '1234567890' || request.query.password != '123456' ){
        const data = {
            _status : false,
            _message : 'Invalid Credentails !',
            _data : []
        }
        response.send(data);
    } else {
        next();
    }
}