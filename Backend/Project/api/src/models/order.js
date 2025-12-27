const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : [true, 'User Id is required'],
        default : '',
        ref : 'users'
    },
    order_number : {
        type : String,
        default : '',
    },
    order_id : {
        type : String,
        default : '',
    },
    order_date : {
        type : Date,
        default : Date.now(),
    },
    payment_id : {
        type : String,
        default : '',
    },
    billing_address : {
        type : Object,
        required : [true, 'Billing Address is required']
    },
    shipping_address : {
        type : Object,
        required : [true, 'Shipping Address is required']
    },
    product_info : {
        type : Array,
        required : [true, 'Product Details is required']
    },
    total_amount : {
        type : Number,
        required : [true, 'Total amount is required'],
        default : '',
    },
    discount_amount : {
        type : Number,
        required : [true, 'Discount amount is required'],
        default : '',
    },
    net_amount : {
        type : Number,
        required : [true, 'Net amount is required'],
        default : '',
    },
    order_status : {
        type : Number,
        default : 1, // 1- Order Placed 2- Order Received 3- Ready to Ship 4 - Order Dispatch 5 - Order Complete 6 - Order Cancel  7 - Order Failed
    },
    payment_status : {
        type : Number,
        default : 1,    // 1 - Pending 2 - Completed 3 - Failed / Cancelled
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

const orderModal = mongoose.model('orders', orderSchema);

module.exports = orderModal;