const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/backend/color.controller');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var router = express.Router();

module.exports = server => {

    router.post('/create',upload.none(), create);

    router.post('/view',upload.none(), view);

    router.post('/details/:id',upload.none(), details);

    router.put('/update/:id',upload.none(), update);

    router.post('/change-status',upload.none(), changeStatus);

    router.post('/destroy',upload.none(), destroy);

    server.use('/api/backend/colors',router);
}