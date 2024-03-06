const express = require('express');
const router = express.Router();
const { Entity } = require('./schema');

router.use(express.json());

router.get('/get', async (req, res) => {
    try {
        const WeirdDressingStyle = await Entity.find().maxTimeMS(20000).exec(); 
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

router.post('/add', (req,res)=>{
    try{
        // res.json(req)
        const add = Entity.create(req.body)
        // console.log(add)
        res.send(req.body)
    }catch(err){
        console.log(err)
        res.send("error");

    }
})

module.exports = router;
