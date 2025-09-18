const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const User = new Schema({
    name: {type: String},
    bio: {type: String},
    email: {type: String, required: true, unique: true},
    avatar: {type: String, default: 'https://cdn.iconscout.com/icon/free/png-512/free-avatar-372-456324.png?f=avif&w=512'},
    password: {type: String, required: true},
    role: {type: String, enum: ['creator', 'brand', 'agency', 'admin'], default: 'Creator'},
    username: {type: String, required: true, unique: true},
    links: [{
        url: {type: String},
        title: {type: String},
        icon: {type: String},
    }],
    socialMedia: {
        facebook: {type: String},
        twitter: {type: String},
        instagram: {type: String},
        youtube: {type: String},
        linkedin: {type: String},
        github: {type: String}
    }
}, {collection: 'user-data-linktree'})

const userModel = model('userData', User);

module.exports = userModel;