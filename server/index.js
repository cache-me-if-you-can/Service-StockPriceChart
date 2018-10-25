const express = require('express');
const bodyParser = require('body-parser');

const PriceDataDay = require('../database/PriceDataDay.js');
const db = require('../database/index.js')

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

<<<<<<< HEAD
// Route path: '/api/symbol/:symbol/day/'
// Request URL: http://localhost:3000/api/symbol/MMMM/day
// req.params: { "symbol": "MMMM" }

// Route path: '/api/symbol/:symbol/week/'
=======
// Route path: '/api/symbol/:symbolId/day/'
// Request URL: http://localhost:3000/api/symbol/MMMM/day
// req.params: { "symbol": "MMMM" }

// Route path: '/api/symbol/:symbolId/week/'
>>>>>>> seedfeature
// Request URL: http://localhost:3000/api/symbol/MMMM/week
// req.params: { "symbol": "MMMM" }

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
