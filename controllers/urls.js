const Url       = require('../models/url');

function indexUrl(req, res) {
  res.status(200).json();
}

function createUrl(req, res, next) {

  Url
    .create(req.body)
    .then((url) => {
      url.host = req.headers.origin;
      res.status(201).json(url);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest();
      next(err);
    });
}

function showUrl(req, res, next) {
  console.log('showUrl function run');

  Url
    .findOne({ alias: req.params.alias })
    .exec()
    .then((url) => {

      // Move to middleware or model
      const httpCheck = new RegExp('^(http|https)://', 'i');

      if (!httpCheck.test(url.url)) {
        url.url = `http://${url.url}`;
      }

      res.redirect(url.url);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  index: indexUrl,
  create: createUrl,
  show: showUrl
};