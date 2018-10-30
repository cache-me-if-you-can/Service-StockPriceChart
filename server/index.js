const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PriceDataDay = require('../database/PriceDataDay.js');
const db = require('../database/index.js');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));


app.get('/api/symbol/:symbolId/day', (req, res) => {
  const { symbolId } = req.params;
  PriceDataDay.find({ symbol: symbolId }, null, { sort: { date: 1 } }, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/api/symbol/:symbolId/week', (req, res) => {
  const { symbolId } = req.params;
  PriceDataDay.find({ symbol: symbolId }, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
