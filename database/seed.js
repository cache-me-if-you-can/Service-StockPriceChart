const db = require('./index.js');
const PriceDataDay = require('./PriceDataDay.js')

const sampleStockPrice = [
  {
    _id: 'aoisfjew2312',
    symbol: 'mm',
    name: 'Merry Men',
    price: 100,
    owner: 4,
    rating: 4,
    created_at: "2017-05-03T03:50:00Z",
  },
  {
    _id: 'aoisfjew2313',
    symbol: 'mm',
    name: 'Merry Men',
    price: 90,
    owner: 4,
    rating: 4,
    created_at: "2017-05-03T03:45:00Z",
  },
  {
    _id: 'aoisfjew2314',
    symbol: 'mm',
    name: 'Merry Men',
    price: 80,
    owner: 4,
    rating: 4,
    created_at: "2017-05-03T03:40:00Z",
  },
];


const insertSampleStockPrice = () => {
  PriceDataDay.create(sampleStockPrice)
    .then(() => db.disconnect());
};

insertSampleStockPrice();