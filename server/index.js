const express = require('express');
const bodyParser = require('body-parser');

const PriceDataDay = require('../database/PriceDataDay.js');
const db = require('../database/index.js')

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// Route path: '/api/symbol/:symbolId/day/'
// Request URL: http://localhost:3000/api/symbol/mm/day
// req.params: { "symbol": "mm" }

// Route path: '/api/symbol/:symbolId/week/'
// Request URL: http://localhost:3000/api/symbol/mm/week
// req.params: { "symbol": "mm" }

app.get('/api/symbol/:symbolId/day', function (req, res) {
  const symbolId = req.params.symbolId;
  PriceDataDay.find({ symbol: symbolId }, (error, results) => {
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
