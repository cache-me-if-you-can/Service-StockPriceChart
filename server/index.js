const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// const { PriceDataDay } = require('../database/PriceDataDay.js');
const db = require('../database/index.js');
const controllers = require('../database/controllers.js');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.route('/api/symbol/:id/day')
  .get((req, res) => {
    const { id } = req.params;

    const resSender = (error, results, next) => {
      if (error) {
        next(error);
      } else {
        res.status(200).send(results);
      }
    };

    controllers.read(id, resSender);
  })
  .post((req, res) => {
    const { id } = req.params;

    const item = { ...req.body };
    item.id = id;

    const resSender = (error, results, next) => {
      if (error) {
        next(error);
      } else {
        res.status(200).send(results);
      }
    };

    controllers.create(item, resSender);
  })
  .put((req, res) => {
    const { id } = req.params;

    const item = { ...req.body };
    item.id = id;

    const resSender = (error, results, next) => {
      if (error) {
        next(error);
      } else {
        res.status(200).send(results);
      }
    };

    controllers.update(id, item, resSender);
  })
  .delete((req, res) => {
    const { id } = req.params;

    const resSender = (error, results, next) => {
      if (error) {
        next(error);
      } else {
        res.status(200).send(results);
      }
    };

    controllers.remove(id, resSender);
  });


// app.get('/api/symbol/:id/week', (req, res) => {
//   const { id } = req.params;
//   PriceDataDay.find({ id }, null, { sort: { date: 1 } }, (error, results, next) => {
//     if (error) {
//       next(error);
//     } else {
//       res.status(200).send(results);
//     }
//   });
// });

app.use('/stockprice', express.static(path.join(__dirname, '/../client/dist')));
app.get('/stockprice/:id', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
