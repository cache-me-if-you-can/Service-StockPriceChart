require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

process.title = 'node express service';

// const { PriceDataDay } = require('../database/PriceDataDay.js');
// const db = require('../database/index.js');
const controllers = require('../database/rocks/controllers.js');

const app = express();
const PORT = 3001;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(function errLogger(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.route('/api/symbol/:id/day')
  .get((req, res, next) => {
    const { id } = req.params;

    const resSender = (error, results) => {
      if (error) {
        next(error);
      }
      // console.log(results);
      res.status(200).send(results);
    };

    controllers.read(id, resSender);
  })
  .post((req, res, next) => {
    const { id } = req.params;

    const item = { ...req.body };
    item.id = id;

    const resSender = (error, results) => {
      if (error) {
        next(error);
      } else {
        res.status(201).send('OK');
      }
    };

    controllers.create(item, resSender);
  })
  .put((req, res, next) => {
    const { id } = req.params;

    const item = { ...req.body };
    item.id = id;

    const resSender = (error, results) => {
      if (error) {
        next(error);
      } else {
        res.status(200).send('OK');
      }
    };

    controllers.update(item, resSender);
  })
  .delete((req, res, next) => {
    const { id } = req.params;

    const item = { ...req.body };
    item.id = id;

    const resSender = (error, results) => {
      if (error) {
        next(error);
      } else {
        res.status(202).send('OK');
      }
    };

    controllers.remove(item, resSender);
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
