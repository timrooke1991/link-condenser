const Url = require('../models/url');

function indexUrl(req, res, next) { 
  res.render('index');
}

function createUrl(req, res, next) {

  Url
    .create(req.body)
    .then((url) => {
      console.log(url);
      // res.redirect(`/posts/${post.id}`);
    })
    .catch((err) => {
      // if(err.name === 'ValidationError') return res.badRequest(`/posts`, err.toString());
      next(err);
    });
}

module.exports = {
  index: indexUrl,
  create: createUrl
};