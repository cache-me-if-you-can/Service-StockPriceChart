const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/pricedataday';
const db = mongoose.connect(mongoUri);

module.exports = db;
