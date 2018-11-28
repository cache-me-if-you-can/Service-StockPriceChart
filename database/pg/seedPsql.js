const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const utils = require('../utils.js');

class Writer {
  constructor(file) {
    this.writer = csvWriter({
      separator: ',',
      sendHeaders: false,
    });
    this.writer.pipe(fs.createWriteStream(file, { flags: 'w' }));
  }

  write(obj) {
    if (!this.writer.write(obj)) {
      return new Promise(resolve => this.writer.once('drain', resolve));
    }
    return true;
  }

  end() {
    this.writer.end();
  }
}

const genStocksTable = async (start, finish, outFile) => {
  const writer = new Writer(outFile);

  for (let id = start; id < finish; id += 1) {
    const symbol = utils.numToSymbol(id);
    const name = faker.company.companyName();
    const owner = faker.random.number({ min: 100, max: 900 });
    const rating = faker.random.number({ min: 30, max: 95 });

    const res = writer.write({ id, symbol, name, owner, rating });
    if (res instanceof Promise) {
      await res;
    }
  }

  writer.end();
};

const genPricesTable = async (start, finish, outFile) => {
  const writer = new Writer(outFile);

  for (let id = start; id < finish; id += 1) {
    for (let time = 0; time < 10; time += 1) {
      const price = Number(faker.finance.amount(100, 900, 0));

      const res = writer.write({ stock_id: id, price, time });
      if (res instanceof Promise) {
        await res;
      }
    }
  }

  writer.end();
};

const tableChoice = process.argv[2];
const start = Number(process.argv[3]) || 0;
const finish = Number(process.argv[4]) || 10000000;


if (tableChoice == 'stock') {
  const filename = 'stocks.csv';
  genStocksTable(start, finish, filename);
}

// to import:
// copy stocks(id, symbol, name, owner, rating)
// FROM '/Users/mrkent/hackreactor/sdc/kent-price-chart/database/stocks.csv' DELIMITER ',' CSV;

if (tableChoice == 'price') {
  const filename = 'prices.csv';
  genPricesTable(start, finish, filename);
}

// copy prices(stock_id, price, time)
// FROM '/Users/mrkent/hackreactor/sdc/kent-price-chart/database/prices.csv' DELIMITER ',' CSV;