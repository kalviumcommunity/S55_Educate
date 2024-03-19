const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

const UserInfo = mongoose.model("UserInfo", userSchema); 

module.exports = { UserInfo };
