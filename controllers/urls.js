const Url       = require('../models/url');
const randStr   = require('randomstring');

function indexUrl(req, res) { 
  const url = false;
  res.render('index', { url });
}

function createUrl(req, res, next) {

  if (!req.body.alias) req.body.alias = randStr.generate(6);

  Url
    .create(req.body)
    .then((url) => {
      url.host = req.headers.origin;
      res.status(201).json(url);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/`, err.toString());
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
      if(!/^(f|ht)htps?:\/\//i.test(url.url)) {
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