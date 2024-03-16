const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Entity } = require('./schema');

router.use(express.json());


const entitySchema = Joi.object({
    Entity: Joi.string().required(),
    Property1: Joi.string().required(),
    Property2: Joi.string().required(),
    Property3: Joi.string().required(),
    Rating: Joi.number().min(0).max(5).required(),
    img: Joi.string()
});


const updateEntitySchema = Joi.object({
    Entity: Joi.string(),
    Property1: Joi.string(),
    Property2: Joi.string(),
    Property3: Joi.string(),
    Rating: Joi.number().min(0).max(5),
    img: Joi.string()
}).min(1); 

const validateEntity = (req, res, next) => {
    const { error } = entitySchema.validate(req.body);
    if (error) {
        console.error('Validation error:', error);
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateUpdateEntity = (req, res, next) => {
    const { error } = updateEntitySchema.validate(req.body);
    if (error) {
        console.error('Validation error:', error);
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

router.get('/get', async (req, res) => {
    try {
        const dresses = await Entity.find();
        res.json(dresses);
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', validateEntity, async (req, res) => {
    try {
        const newEntity = await Entity.create(req.body);
        res.status(201).json(newEntity);
    } catch (err) {
        console.error('Error adding entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/update/:id', validateUpdateEntity, async (req, res) => {
    try {
        const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntity);
    } catch (err) {
        console.error('Error updating entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Entity.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        console.error('Error deleting entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
