const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
    Dress: {
        Entity: String,
        Property: String,
        Property2: String,
        Property3: String,
        Rating: Number,
        img: String,

    }
});

const Entity = mongoose.model('dress-collections', EntitySchema); 

module.exports = {Entity};
