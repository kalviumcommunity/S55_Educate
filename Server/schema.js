const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
        Entity: String,
        Property1: String,
        Property2: String,
        Property3: String,
        Rating: Number,
        img: String,
});

const Entity = mongoose.model('dress-collections', EntitySchema); 

module.exports = {Entity};
