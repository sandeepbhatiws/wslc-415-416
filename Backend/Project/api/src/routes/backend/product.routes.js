const express = require('express');
const { viewSubSubCategories, viewMaterials, viewColors, create, view, details, update, changeStatus, destroy } = require('../../controllers/backend/product.controller');
const multer  = require('multer')
const uploads = multer({ dest: 'uploads/products' })
const path = require('path');
const { viewCategories, viewSubCategories } = require('../../controllers/backend/subSubCategory.controller');

var router = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/products')
        },
        filename: function (req, file, cb) {
            var extension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + extension)
        }
    })

    const upload = multer({ storage: storage })

    // const singleImage = upload.single('image');
    // const multipleImage = upload.array('images', 6);
    const uploadMiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

    router.post('/view-categories',upload.none(), viewCategories);
    
    router.post('/view-sub-categories',upload.none(), viewSubCategories);

    router.post('/view-sub-sub-categories',upload.none(), viewSubSubCategories);

    router.post('/materials',upload.none(), viewMaterials);

    router.post('/colors',upload.none(), viewColors);

    router.post('/create',uploadMiddleware, create);

    router.post('/view',upload.none(), view);

    router.post('/details/:id',upload.none(), details);

    router.put('/update/:id',uploadMiddleware, update);

    router.post('/change-status',upload.none(), changeStatus);

    router.post('/destroy',upload.none(), destroy);

    server.use('/api/backend/products',router);
}