const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/stockpricechart';
const db = mongoose.connect(mongoUri);


module.exports = db;