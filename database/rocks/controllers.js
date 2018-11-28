/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const level = require('level-rocksdb');
const path = require('path');

const dbPath = path.join(__dirname, 'rocksdb');
const db = level(dbPath);

function getStockPrices(id, callback) {
  // console.log(id);
  const start = `00000000${Number(id)}-000`.slice(-12);
  const end = `00000000${Number(id) + 1}-000`.slice(-12);

  const options = {
    gte: start,
    lt: end,
  };

  // console.log(options);

  const stockInfo = {
    id: '',
    symbol: '',
    name: '',
    owner: 0,
    rating: 0,
  };

  const priceList = [];

  // db.get(start, function (err, value) {
  //   if (err) {
  //     if (err.notFound) {
  //       callback(err);
  //       return;
  //     }
  //     return callback(err);
  //   }

  //   callback(null, value);
  // });


  db.createReadStream(options)
    .on('data', function (data) {
      if (data.key === start) {
        const stockInfoArray = data.value.split('|');
        stockInfo.id = Number(stockInfoArray[0]);
        stockInfo.symbol = stockInfoArray[1];
        stockInfo.name = stockInfoArray[2];
        stockInfo.owner = Number(stockInfoArray[3]);
        stockInfo.rating = Number(stockInfoArray[4]);
        // console.log(stockInfo);
      } else {
        priceList.push(Number(data.value));
        // console.log(priceList);
      }
    })
    .on('error', function (err) {
      callback(err, null);
    })
    .on('close', function () {
    })
    .on('end', function () {
      const resJson = priceList.map(price => ({ ...stockInfo, price }));
      callback(null, resJson);
    });
}

function doNothing() {
  // console.log('hi');
}

module.exports = {
  read: getStockPrices,
  create: doNothing,
  update: doNothing,
  remove: doNothing,
};
