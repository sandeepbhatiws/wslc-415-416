const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name : {
        type: String,
        default : '',
        required : [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
    },
    parent_category_id : {
        type : String,
        default : '',
        required : [true, 'Parent category is required'],
        ref : "categories"
    },
    slug : {
        type : String,
        required : [true, 'Slug is required'],
        default : ''
    },
    image : {
        type : String,
        default : ''
    },
    status : {
        type : Boolean,
        default : true
    },
    order : {
        type : Number,
        min : [0, 'Minimum value must be greather than 0'],
        max : [1000, 'Maximum value must be less than 1000'],
        default : 0
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    updated_at : {
        type : Date,
        default : Date.now()
    },
    deleted_at : {
        type : Date,
        default : ''
    },
});

const subCategoryModal = mongoose.model('sub_categories', subCategorySchema);

module.exports = subCategoryModal;