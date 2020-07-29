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
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    tags: {
        type: Array,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true,
});

const Accounts = mongoose.model('Accounts', accountsSchema);
module.exports = Accounts;

