const { Pool } = require('pg');

const pool = new Pool({
  user: 'mrkent',
  host: 'localhost',
  database: 'chart',
  port: 5432,
});

const read = function read(id, callback) {
  pool.query('select * from stocks inner join prices on stocks.id = prices.stock_id where stock_id = $1 ORDER BY time', [id])
    .then(res => callback(null, res.rows))
    .catch(err => callback(err));
};

const create = function create(item, callback) {
  pool.query('insert into prices (stock_id, price, time) values ($1, $2, (select count(time) from prices where stock_id=$1))', [item.id, item.price])
    .then(res => callback(null, res))
    .catch(err => callback(err));
};

const update = function update(item, callback) {
  pool.query('UPDATE prices SET price=$2 WHERE stock_id=$1 and time=$3', [item.id, item.price, item.time])
    .then(res => callback(null, res))
    .catch(err => callback(err));
};

const remove = function remove(item, callback) {
  pool.query('DELETE FROM prices WHERE stock_id=$1 and time=$2', [item.id, item.time])
    .then(res => callback(null, res))
    .catch(err => callback(err));
};

module.exports = {
  read,
  create,
  update,
  remove,
};
