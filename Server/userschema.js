const mongoose = require('mongoose');

const user = mongoose.schema({
    userName: String,
    password: String
   
});

const userInfo = mongoose.model("userinfo", user);
model.exports= {userInfo};
