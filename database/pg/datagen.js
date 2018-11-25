const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter({ 
  separator: '|',
});

const stockPriceDay = (n, outFile) => {
  const stream = fs.createWriteStream(outFile, { flags: 'w' });
  writer.pipe(stream);


  for (let id = 0; id < n; id += 1) {
    const symbol = faker.finance.currencyCode();
    const name = faker.company.companyName();
    const owner = faker.random.number({ min: 100, max: 900 });
    const rating = faker.random.number({ min: 1, max: 85 });
    const prices = [];

    for (let hour = 9; hour <= 18; hour += 1) {
      for (let minute = 0; minute <= 60; minute += 5) {
        const price = Number(faker.finance.amount(100, 900, 0));
        const d = new Date(2018, 9, 25, hour, minute);
        const date = d.toISOString();
        prices.push(price);
      }
    }

    writer.write({ id, symbol, name, owner, rating, prices: JSON.stringify(prices) });
  }
};

const number = process.argv[2] || 10;
const filename = process.argv[3] || 'testfile';

stockPriceDay(number, filename);
