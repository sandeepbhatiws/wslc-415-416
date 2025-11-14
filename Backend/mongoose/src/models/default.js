const mongoose = require('mongoose');

const defaultSchema = new mongoose.Schema({
    name : {
        type: String,
        default : '',
        // enum : ['men', 'women'],
        required : [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
        validate: {
        validator: async function(v) {
            const user = await this.constructor.findOne({ name: v });
            return !user;
        },
        message: props => `The specified username is already in use.`
        }
        // minLength : [2, 'Minimum length must be greather than 2'],
        // maxLength : [15, 'Maximum length must be less than 15'],
    },
    status : {
        type : Boolean,
        default : true
    },
    order : {
        type : Number,
        min : [5, 'Minimum value must be greather than 5'],
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

const defaultModal = mongoose.model('defaults', defaultSchema);

module.exports = defaultModal;