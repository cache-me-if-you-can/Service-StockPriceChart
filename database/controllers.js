const { PriceDataDay } = require('../database/PriceDataDay.js');

module.exports.read = function (id, callback) {
  PriceDataDay.find({ id }, null, { sort: { date: 1 } }, callback);
};

module.exports.create = function (item, callback) {
  PriceDataDay.create(item, callback);
};

module.exports.update = function (item, callback) {
  PriceDataDay.findOneAndUpdate({ id: item.id }, item, callback);
};

module.exports.remove = function (item, callback) {
  PriceDataDay.deleteOne({ id: item.id, time: item.time }, callback);
};
