// routes.js
const express = require('express');
const router = express.Router();
const { Entity } = require('./schema');

router.use(express.json());

router.get('/get', async (req, res) => {
    try {
        const weirdDressingStyle = await Entity.find().maxTimeMS(20000).exec(); 
        res.json(weirdDressingStyle); 
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req,res) => {
    try {
        const newEntity = await Entity.create(req.body);
        res.json(newEntity);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error adding entity' });
    }
});

module.exports = router;
