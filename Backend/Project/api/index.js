const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('dotenv').config();

// To Make Executable Function
const server = express();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.use(cors());

server.get('/', (request, response) => {
    response.send('<h1>Server is working fine.</h1>');
})

// Website URL


// Application URL


// Backend URL
require('./src/routes/backend/default.routes')(server);
require('./src/routes/backend/material.routes')(server);
require('./src/routes/backend/color.routes')(server);



server.listen(process.env.PORT, () => {
    mongoose.connect(`${ process.env.mongoDb }`)
    .then(() => console.log('Connected!'))
    .catch((error) => {
        console.log(error)
    });
    console.log('Server is working fine.')
})