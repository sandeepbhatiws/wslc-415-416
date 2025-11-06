const express = require('express');
const validation = require('./middleware.js');
const { categories, brands } = require('./Controllers/APIController.js');

const server = express(); // To Make Executable Function

server.get('/', (request, response) => {
    response.send('Server Started !!');
});

const route = express.Router();
route.use(validation);


server.get('/categories', validation, categories)

route.get('/brands', brands)

server.use('/',route);

server.listen(5000, () => {
    console.log('Server is working fine');
})