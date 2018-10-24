const express = require('express');
const bodyParser = require('body-parser');

const PriceDataDay = require('../database/PriceDataDay.js');
const db = require('../database/index.js')

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// Route path: '/api/day/symbol/:symbol'
// Request URL: http://localhost:3000/day/symbol/mm
// req.params: { "symbol": "mm" }

// Route path: '/api/week/symbol/:symbol'
// Request URL: http://localhost:3000/week/symbol/mm
// req.params: { "symbol": "mm" }

app.get('/api/day/symbol', function (req, res) {
  const symbol = req.params;
  PriceDataDay.find({}, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  })
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
