const Url       = require('../models/url');
const randStr   = require('randomstring');

function indexUrl(req, res) { 
  res.render('index');
}

function createUrl(req, res, next) {

  if (!req.body.alias) req.body.alias = randStr.generate(6);

  Url
    .create(req.body)
    .then((url) => {
      console.log(url);
      res.redirect('/');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/`, err.toString());
      next(err);
    });
}

function showUrl(req, res, next) {

  console.log(req.params);
  
  Url
    .findOne({ alias: req.params.alias })
    .exec()
    .then((url) => {
      console.log(url);
      res.redirect(url.url);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.badRequest(`/`, err.toString());
      next(err);
    });
}

module.exports = {
  index: indexUrl,
  create: createUrl,
  show: showUrl
};