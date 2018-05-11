const Url       = require('../models/url');
const randStr   = require('randomstring');

function indexUrl(req, res) { 
  const url = false;
  res.render('index', { url });
}

function createUrl(req, res, next) {

  if (!req.body.alias) req.body.alias = randStr.generate(6);
  // check with http:// present
  // duplicate alias  
  Url
    .create(req.body)
    .then((url) => {
      url.host = req.headers.host;
      res.render('index', { url });
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/`, err.toString());
      next(err);
    });
}

function showUrl(req, res, next) {
  
  Url
    .findOne({ alias: req.params.alias })
    .exec()
    .then((url) => {
      console.log(url);
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