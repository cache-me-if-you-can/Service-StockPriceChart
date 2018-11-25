const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const priceDataSchema = new mongoose.Schema({
  id: Number,
  symbol: String,
  name: String,
  price: Number,
  owner: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  time: String,
  date: String,
});

const PriceDataDay = mongoose.model('PriceDataDay', priceDataSchema);
const PriceDataWeek = mongoose.model('PriceDataWeek', priceDataSchema);

module.exports = {
  PriceDataDay,
  PriceDataWeek,
};
