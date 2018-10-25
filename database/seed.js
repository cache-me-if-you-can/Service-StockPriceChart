const db = require('./index.js');
const PriceDataDay = require('./PriceDataDay.js')

const minute = 5;
const limit = (18 - 9) * 60 / minute;

"_id" : ObjectId("5bd1f5fee4f50c65becddb77"),

const sampleStockPrice = [
  {
    "id": {
      "$oid": "5bd1f328fc13ae22710017ce"
    },
    "price": 99.59,
    "owner": 4,
    "rating": 4,
    "time": "10:30:13.000",
    "date": "2018-10-24T00:00:00Z"
  }, {
    "id": {
      "$oid": "5bd1f328fc13ae22710017cf"
    },
    "price": 79.35,
    "owner": 4,
    "rating": 4,
    "time": "16:58:15.000",
    "date": "2018-10-24T00:00:00Z"
  },
];


const insertSampleStockPrice = () => {
  PriceDataDay.create(sampleStockPrice)
    .then(() => db.disconnect());
};

insertSampleStockPrice();