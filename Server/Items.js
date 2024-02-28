// item.js
const mongoose = require('mongoose');

// Define Item Schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  // add more fields as needed
});

// Create Item model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
