const express = require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;
let status = "disconnected"

const startConnect async () => {
  try(
    await mongoose.connect(process.)
  )
}


app.get('/', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});