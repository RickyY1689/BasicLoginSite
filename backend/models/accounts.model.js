const mongoose = require('mongoose');
const { List } = require('@material-ui/core');
const Schema = mongoose.Schema;

const accountsSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true 
    },    
    email: {
        type: String,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    interests: {
        type: [],
        required: true, 
    },
    tagsAssociated: {
        type: [String],
        required: true
    },
    tagsDesired: {
        type: Array,
        trim: true,
        minlength: 3
    },
    summary: {
        type: String,
        reuired: true
    }

}, {
    timestamps: true,
});

const Accounts = mongoose.model('Accounts', accountsSchema);
module.exports = Accounts;

