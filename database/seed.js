const faker = require('faker');
const db = require('./index.js');
const PriceDataDay = require('./PriceDataDay.js');

const sampleStockPrice = () => {
  const result = [];

  for (let hour = 9; hour < 18; hour += 1) {
    for (let minute = 0; minute <= 60; minute += 5) {
      const symbol = 'MMMM';
      const randomPrice = Number(faker.finance.amount(1, 100, 2));
      const d = new Date(2018, 9, 25, hour, minute);
      result.push({
        symbol,
        name: 'Merry Men',
        price: randomPrice,
        owner: 4,
        rating: 4,
        date: d,
      });
    }
  }
  return result;
};

const sampleStockPrice2 = () => {
  const result = [];

  for (let hour = 9; hour < 18; hour += 1) {
    for (let minute = 0; minute <= 60; minute += 5) {
      const symbol = faker.finance.currencyCode();
      const companyName = faker.company.companyName();
      const randomOwner = faker.random.number({ min: 10, max: 1000 });
      const randomPrice = Number(faker.finance.amount(10, 1000, 2));
      const d = new Date(2018, 9, 25, hour, minute);
      result.push({
        symbol,
        name: companyName,
        price: randomPrice,
        owner: randomOwner,
        rating: randomOwner,
        date: d,
      });
    }
  }

  return result;
};

const insertSampleStockPrice = (dataFunction) => {
  PriceDataDay.create(dataFunction())
    .then(() => db.disconnect());
};

insertSampleStockPrice(sampleStockPrice);
insertSampleStockPrice(sampleStockPrice2);