// schema.js
const mongoose = require('mongoose');
const Joi = require('joi');

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
    img:{ 
        type: String
    },
    created_by:{
        type: String,
        required: true  
    } 
});

const Entity = mongoose.model('dress-collections', EntitySchema);

const entityJoiSchema = Joi.object({
    Entity: Joi.string().required(),
    Property1: Joi.string().required(),
    Property2: Joi.string().required(),
    Property3: Joi.string().required(),
    Rating: Joi.number().min(0).max(5).required(),
    img: Joi.string(),
    created_by: Joi.string().required()
});

module.exports = { Entity, entityJoiSchema };
