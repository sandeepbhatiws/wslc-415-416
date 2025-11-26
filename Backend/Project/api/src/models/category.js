const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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

const categoryModal = mongoose.model('categories', categorySchema);

module.exports = categoryModal;