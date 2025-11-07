const express = require('express');
const mongodb = require('mongodb');
const { create, view, details, update, destroy } = require('./Controllers/materail');

const server = express();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.get('/', (request, response) => {
    response.send('Server working !!');
})

// server.get('/api/color/create', create);
// server.get('/api/color/view', view);
// server.get('/api/color/details/:id', details);
// server.get('/api/color/update/:id', update);
// server.get('/api/color/delete/:id', destroy);

server.post('/api/material/create', create)
server.post('/api/material/view', view);
server.post('/api/material/details/:id', details);
server.put('/api/material/update/:id', update);
server.delete('/api/material/delete/:id', destroy);



server.listen(5000, () => {
    console.log('Server is working fine !!');
});