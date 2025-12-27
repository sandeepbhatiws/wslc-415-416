const express = require('express');
const multer  = require('multer');
const { placeOrder, changeStatus, dashboard } = require('../../controllers/website/order.controller');
const upload = multer({ dest: 'uploads' })

var router = express.Router();

module.exports = server => {

    router.post('/place-order',upload.none(), placeOrder);

    router.post('/change-status',upload.none(), changeStatus);

    router.post('/dashboard',upload.none(), dashboard);

    server.use('/api/website/order',router);
}