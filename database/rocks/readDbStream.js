/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const level = require('level-rocksdb');
const { performance } = require('perf_hooks');

const dbPath = process.argv[2];
const db = level(dbPath);

const stockId = Number(process.argv[3]) || 0;

function getStockPrices(stockId, callback) {
  const start = `00000000${stockId}-000`.slice(-12);
  const end = `00000000${stockId + 1}-000`.slice(-12);

  const options = {
    gte: start,
    lt: end,
  };

  const stockInfo = {
    id: '',
    symbol: '',
    name: '',
    owner: 0,
    rating: 0,
  };

  const priceList = [];

  db.createReadStream(options)
    .on('data', function (data) {
      if (data.key === start) {
        const stockInfoArray = data.value.split('|');
        stockInfo.id = Number(stockInfoArray[0]);
        stockInfo.symbol = stockInfoArray[1];
        stockInfo.name = stockInfoArray[2];
        stockInfo.owner = Number(stockInfoArray[3]);
        stockInfo.rating = Number(stockInfoArray[4]);
      } else {
        priceList.push(Number(data.value));
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

async function getStock(key) {
  const t0 = performance.now();
  let result = await db.get(key);
  console.log(result);
  console.log('end: ', performance.now() - t0);
  return result;
}

// getStock('00000001-000');

getStockPrices(stockId, console.log);
