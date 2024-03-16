const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
    Entity: {
        type: String,
        required: true
    },
    Property1: {
        type: String,
        required: true
    },
    Property2: {
        type: String,
        required: true
    },
    Property3: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    img: String,
});

const Entity = mongoose.model('dress-collections', EntitySchema);

module.exports = { Entity };
