const express = require('express');
const multer  = require('multer');
const { register, login, viewProfile, updateProfile } = require('../../controllers/website/user.controller');
const upload = multer({ dest: 'uploads/users' })

var router = express.Router();

module.exports = server => {

    router.post('/register',upload.none(), register);

    router.post('/login',upload.none(), login);

    router.post('/view-profile',upload.none(), viewProfile);

    router.put('/update-profile',upload.none(), updateProfile);

    // router.post('/change-status',upload.none(), changeStatus);

    // router.post('/destroy',upload.none(), destroy);

    server.use('/api/website/users',router);
}