const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/backend/default.controller');

var router = express.Router();

module.exports = server => {

    router.post('/create', create);

    router.post('/view', view);

    router.post('/details/:id', details);

    router.post('/update/:id', update);

    router.post('/change-status', changeStatus);

    router.post('/destroy', destroy);

    server.use('/api/backend/default',router);
}