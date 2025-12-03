const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        default : '',
        required : [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
        // validate: {
        //     validator: async function(v) {
        //         const name = await this.constructor.findOne({ name: v, deleted_at : null });
        //         return !name;
        //     },
        //     message: props => `The specified name is already in use.`
        // }
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
    images : {
        type : Array,
        default : []
    },
    actual_price : {
        type : Number,
        default : '',
        required : [true, 'Actual Price is required']
    },
    sale_price : {
        type : Number,
        default : '',
        required : [true, 'Sale Price is required']
    },
    short_description : {
        type : String,
        default : '',
        required : [true, 'Short Description is required']
    },
    product_code : {
        type : String,
        default : '',
        required : [true, 'Product Code is required']
    },
    dimesnsion : {
        type : String,
        default : '',
        required : [true, 'Dimesnsion is required']
    },
    delivery_days : {
        type : String,
        default : '',
        required : [true, 'Delivery Days is required']
    },
    description : {
        type : String,
        default : '',
        required : [true, 'Description is required']
    },
    is_featured : {
        type : Number,
        default : 1, // 1 - Yes 2 - No
        required : [true, 'Is featured is required']
    },
    is_new_arrivals : {
        type : Number,
        default : 1, // 1 - Yes 2 - No
        required : [true, 'Is new arrivals is required']
    },
    is_on_sale : {
        type : Number,
        default : 1, // 1 - Yes 2 - No
        required : [true, 'Is on sale is required']
    },
    is_best_sellings : {
        type : Number,
        default : 1, // 1 - Yes 2 - No
        required : [true, 'Is best sellings is required']
    },
    is_up_sell : {
        type : Number,
        default : 1, // 1 - Yes 2 - No
        required : [true, 'Is up sell is required']
    },
    material_id : {
        type : String,
        default : '',
        required : [true, 'Material Id is required'],
        ref : "materials"
    },
    color_id : {
        type : String,
        default : '',
        required : [true, 'Color is required'],
        ref : "colors"
    },
    parent_category_id : {
        type : String,
        default : '',
        required : [true, 'Parent category is required'],
        ref : "categories"
    },
    sub_category_id : {
        type : String,
        default : '',
        required : [true, 'Sub category is required'],
        ref : "sub_categories"
    },
    sub_sub_category_id : {
        type : String,
        default : '',
        required : [true, 'Sub Sub category is required'],
        ref : "sub_sub_categories"
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

const productModal = mongoose.model('products', productSchema);

module.exports = productModal;