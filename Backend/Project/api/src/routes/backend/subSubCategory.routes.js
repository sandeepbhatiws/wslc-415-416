const express = require('express');
const { viewCategories, viewSubCategories, create, view, details, update, changeStatus, destroy } = require('../../controllers/backend/subSubCategory.controller');
const multer  = require('multer')
const uploads = multer({ dest: 'uploads/categories' })
const path = require('path');

var router = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/categories')
        },
        filename: function (req, file, cb) {
            var extension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + extension)
        }
    })

    const upload = multer({ storage: storage })

    const singleImage = upload.single('image');

    router.post('/view-categories',upload.none(), viewCategories);

    router.post('/view-sub-categories',upload.none(), viewSubCategories);

    router.post('/create',singleImage, create);

    router.post('/view',upload.none(), view);

    router.post('/details/:id',upload.none(), details);

    router.put('/update/:id',singleImage, update);

    router.post('/change-status',upload.none(), changeStatus);

    router.post('/destroy',upload.none(), destroy);

    server.use('/api/backend/sub-sub-categories',router);
}