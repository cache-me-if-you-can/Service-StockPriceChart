const faker = require('faker');
const db = require('./index.js');
const { PriceDataDay } = require('./PriceDataDay.js');

const stockPriceDay = () => {
  const result = [];

  for (let id = 0; id < 121; id += 1) {
    const symbol = faker.finance.currencyCode();
    const name = faker.company.companyName();
    const owner = faker.random.number({ min: 100, max: 900 });
    const rating = faker.random.number({ min: 1, max: 85 });

    for (let hour = 9; hour <= 18; hour += 1) {
      for (let minute = 0; minute <= 60; minute += 5) {
        const price = Number(faker.finance.amount(100, 900, 2));
        const d = new Date(2018, 9, 25, hour, minute);
        const date = d.toString();
        result.push({ id, symbol, name, price, owner, rating, date });
      }
    }
  }

  return result;
};

const insertStockPriceDay = (dataFunction) => {
  PriceDataDay.create(dataFunction())
    .then(() => db.disconnect());
};

insertStockPriceDay(stockPriceDay);
