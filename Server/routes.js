const express = require('express');
const router = express.Router();
const { Entity } = require('./schema');

router.use(express.json());

router.get('/get', async (req, res) => {
    try {
        const dresses = await Entity.find(); 
        res.json(dresses); 
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/add', async (req, res) => {
    try {
        const newEntity = await Entity.create(req.body);
        res.status(201).json(newEntity);
    } catch (err) {
        console.error('Error adding entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/update/:id', async (req, res) => {
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