const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { PriceDataDay } = require('../database/PriceDataDay.js');
const db = require('../database/index.js');
const con = require('../database/controllers.js');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.route('/api/symbol/:id/day')
  .get((req, res) => {
    const { id } = req.params;

    const resSender = (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(results);
      }
    };

    con.read(id, resSender);
  })
  .post((req, res) => {
    const { id } = req.params;

    const item = Object.assign({}, req.body);
    item.id = id;

    const resSender = (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(results);
      }
    };

    con.create(item, resSender);
  })
  .put((req, res) => {
    const { id } = req.params;

    const item = Object.assign({}, req.body);
    item.id = id;

    const resSender = (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(results);
      }
    };

    con.update(id, item, resSender);
  })
  .delete((req, res) => {
    const { id } = req.params;

    const resSender = (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(results);
      }
    };

    con.remove(id, resSender);
  });


app.get('/api/symbol/:id/week', (req, res) => {
  const { id } = req.params;
  PriceDataDay.find({ id }, null, { sort: { date: 1 } }, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.use('/stockprice', express.static(path.join(__dirname, '/../client/dist')));
app.get('/stockprice/:id', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
