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

create unique index symbol_index on stocks (symbol);
create index stock_id_index on prices (stock_id);