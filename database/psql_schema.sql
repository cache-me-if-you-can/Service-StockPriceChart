CREATE DATABASE chart;

\c chart;

CREATE TABLE stocks (
  id INT PRIMARY KEY,
  symbol VARCHAR(5),
  name VARCHAR(45),
  owner int,
  rating smallint
);

CREATE TABLE prices (
  id SERIAL PRIMARY KEY, 
  stock_id INT REFERENCES stocks(id),
  price smallint,
  time INT
);

copy stocks(id, symbol, name, owner, rating) 
FROM '/Users/mrkent/hackreactor/sdc/kent-price-chart/database/stocks.csv' DELIMITER ',' CSV;