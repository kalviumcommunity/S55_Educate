const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Entity } = require('./schema');
const { userInfo } = require('./userschema'); // Import userInfo model

router.use(express.json());

// Define entity schema for validation
const entitySchema = Joi.object({
    Entity: Joi.string().required(),
    Property1: Joi.string().required(),
    Property2: Joi.string().required(),
    Property3: Joi.string().required(),
    Rating: Joi.number().min(0).max(5).required(),
    img: Joi.string()
});

// Define schema for updating entity
const updateEntitySchema = Joi.object({
    Entity: Joi.string(),
    Property1: Joi.string(),
    Property2: Joi.string(),
    Property3: Joi.string(),
    Rating: Joi.number().min(0).max(5).allow(null),
    img: Joi.string()
}).min(1);

// Middleware for validating entity creation
const validateEntity = (req, res, next) => {
    const { error } = entitySchema.validate(req.body);
    if (error) {
        console.error('Validation error:', error);
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Middleware for validating entity update
const validateUpdateEntity = (req, res, next) => {
    const { error } = updateEntitySchema.validate(req.body);
    if (error) {
        console.error('Validation error:', error);
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Route to get all entities
router.get('/get', async (req, res) => {
    try {
        const entities = await Entity.find();
        res.json(entities);
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new entity
router.post('/add', validateEntity, async (req, res) => {
    try {
        const newEntity = await Entity.create(req.body);
        res.status(201).json(newEntity);
    } catch (err) {
        console.error('Error adding entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update an entity by ID
router.put('/update/:id', validateUpdateEntity, async (req, res) => {
    try {
        const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        res.json(updatedEntity);
    } catch (err) {
        console.error('Error updating entity:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete an entity by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        await Entity.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        console.error('Error deleting entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for user signup
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Create a new user
        const newUser = await userInfo.create({
            username: username,
            password: password
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error in user signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find user by username and password
        const user = await userInfo.findOne({ username: username, password: password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error('Error in user login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for user logout
router.post('/logout', (req, res) => {
    // Clear cookies or session data as per your authentication mechanism
    res.clearCookie('username');
    res.clearCookie('password');
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
