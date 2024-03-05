const schema = require('./schema')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const {Entity} = require('./schema')

router.use(express.json())

router.get('/get', async (req, res) => {
    try {
        const WeirdDressingStyle = await Entity.find(); 
        res.json(WeirdDressingStyle); 
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/post',(req,res)=>{
    console.log(req.body)
    res.json(req.body)
})

router.put('/put',(req,res)=>{
    res.send("put request")
})

router.delete('/delete',(req,res)=>{
    res.send("delete request")
})

module.exports = router