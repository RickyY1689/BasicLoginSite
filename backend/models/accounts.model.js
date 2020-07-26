const mongoose = require('mongoose');
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
    }
}, {
    timestamps: true,
});

const Accounts = mongoose.model('Accounts', accountsSchema);
module.exports = Accounts;

