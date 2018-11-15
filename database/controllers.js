const { PriceDataDay } = require('../database/PriceDataDay.js');

module.exports.read = function (id, callback) {
  PriceDataDay.find({ id }, null, { sort: { date: 1 } }, callback);
};

module.exports.create = function (item, callback) {
  PriceDataDay.create(item, callback);
};

module.exports.update = function (id, newItem, callback) {
  PriceDataDay.findOneAndUpdate({ id }, newItem, callback);
};

module.exports.remove = function (id, callback) {
  PriceDataDay.deleteOne({ id }, callback);
};
