const faker = require('faker');
const level = require('level-rocksdb');
const utils = require('../utils.js');
const { performance } = require('perf_hooks');
const _ = require('underscore');

const startAt = Number(process.argv[2]) || 0;
const endAt = Number(process.argv[3]) || 10;
const dbPath = process.argv[4];

const db = level(dbPath);

const stockPriceDay = (begin, end) => {
  const result = [];

  for (let id = begin; id < end; id += 1) {
    const symbol = utils.numToSymbol(id);
    const name = faker.company.companyName();
    const owner = faker.random.number({ min: 100, max: 900 });
    const rating = faker.random.number({ min: 1, max: 85 });

    result.push({
      type: 'put',
      key: `00000000${id}-000`.slice(-12),
      value: `${id}|${symbol}|${name}|${owner}|${rating}`,
    });

    for (let time = 1; time <= 10; time += 1) {
      const price = faker.finance.amount(100, 900, 0);

      const timeKey = `000${time}`.slice(-3);

      result.push({
        type: 'put',
        key: `00000000${id}-${timeKey}`.slice(-12),
        value: price,
      });
    }
  }

  return result;
};

const storeBatch = async (start, finish) => {
  const ops = stockPriceDay(start, finish);

  console.log(`Insert STARTED ${start} to ${finish}`);
  const t0 = performance.now();
  try {
    const batchInput = await db.batch(ops);
    console.log(`Insert FINISHED ${start} to ${finish}`);
    console.log('end: ', performance.now() - t0);
    return batchInput;
  } catch (err) {
    console.log('error: ', err);
    return 'error';
  }
};

console.log(startAt, endAt);

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

async function seedBulkBy100k(startAt, endAt) {
  const range = _.range(startAt, endAt, 100000);
  // eslint-disable-next-line no-restricted-syntax
  if (endAt < 100000) {
    await storeBatch(startAt, endAt);
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const num of range) {
      await storeBatch(num, num + 100000);
    }
  }
}

seedBulkBy100k(startAt, endAt);
