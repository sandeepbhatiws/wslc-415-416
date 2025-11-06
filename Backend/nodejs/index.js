const http = require('http');
const { categories, brands, productDetails } = require('./apiData');

http.createServer((request, response) => {

    console.log(request.method);

    if(request.url == '/'){
        response.end('<h1>Server is started</h1>');
    } else if(request.url == '/categories' && request.method == 'GET'){

        const data = {
            _status : true, 
            _message : 'Record found succussfully !',
            _data : categories
        }

        response.end(JSON.stringify(data));
    } else if(request.url == '/brands' && request.method == 'POST'){

        if(brands.length > 0){
            const data = {
                _status : true, 
                _message : 'Record found succussfully !',
                _data : brands
            }

            response.end(JSON.stringify(data));
        } else {
            const data = {
                _status : false, 
                _message : 'No record found !',
                _data : []
            }

            response.end(JSON.stringify(data));
        }

        
    } else if(request.url == '/product-details' && request.method == 'POST'){

        if(productDetails != ''){
            const data = {
                _status : true, 
                _message : 'Record found succussfully !',
                _data : productDetails
            }

            response.end(JSON.stringify(data));
        } else {
            const data = {
                _status : false, 
                _message : 'No record found !',
                _data : null
            }

            response.end(JSON.stringify(data));
        }

        
    } else {
        response.end('API not found !!')
    }
})
.listen(5000, () => {
    console.log('Server is working !!')
});