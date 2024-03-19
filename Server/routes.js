const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Entity } = require('./schema');
const { UserInfo } = require('./userschema');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.use(express.json());
router.use(cookieParser());

const secretKey = process.env.SECRET_KEY;

const authSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const entitySchema = Joi.object({
    Entity: Joi.string().required(),
    Property1: Joi.string().required(),
    Property2: Joi.string().required(),
    Property3: Joi.string().required(),
    Rating: Joi.number().min(0).max(5).required(),
    img: Joi.string().allow(null, '')
});

const updateEntitySchema = Joi.object({
    Entity: Joi.string(),
    Property1: Joi.string(),
    Property2: Joi.string(),
    Property3: Joi.string(),
    Rating: Joi.number().min(0).max(5).allow(null),
    img: Joi.string().allow(null, '')
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
        const entities = await Entity.find();
        res.json(entities);
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newEntity = await Entity.create({
            ...req.body,
            created_by: req.user.id 
        });
        res.status(201).json(newEntity);
    } catch (err) {
        console.error('Error adding entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

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

router.delete('/delete/:id', async (req, res) => {
    try {
        await Entity.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        console.error('Error deleting entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/auth', async(req,res) => {
    try {
        const { username, password } = req.body;
        const user = await UserInfo.findOne({ username: username, password: password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }

        const token = jwt.sign({ id: user._id }, secretKey);
        res.cookie('token', token, { httpOnly: true });
        res.json({ accessToken: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await UserInfo.create({
            username: username,
            password: password
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error in user signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserInfo.findOne({ username: username, password: password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }
        const token = jwt.sign({ id: user._id }, secretKey);
        res.cookie('token', token, { httpOnly: true });
        res.json({ accessToken: token });
    } catch (err) {
        console.error('Error in user login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
