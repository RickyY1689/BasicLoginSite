const mongoose = require('mongoose');
const { List } = require('@material-ui/core');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
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
    img: {
        data: Buffer,
        contentType: String 
    },
    summary: {
        type: String,
        reuired: true
    }

}, {
    timestamps: true,
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
module.exports = UserInfo;

