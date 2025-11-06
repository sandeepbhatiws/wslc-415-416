const express = require('express');
const mongodb = require('mongodb');
const { create, view, details } = require('./Controllers/color');

const server = express();

server.get('/', (request, response) => {
    response.send('Server working !!');
})

server.get('/api/color/create', create);
server.get('/api/color/view', view);
server.get('/api/color/details/:id', details);


server.listen(5000, () => {
    console.log('Server is working fine !!');
});