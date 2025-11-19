const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/backend/material.controller');

var router = express.Router();

module.exports = server => {

    router.post('/create', create);

    router.post('/view', view);

    router.post('/details/:id', details);

    router.put('/update/:id', update);

    router.post('/change-status', changeStatus);

    router.post('/destroy', destroy);

    server.use('/api/backend/materials',router);
}