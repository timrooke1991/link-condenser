function customResponses(req, res, next) {

  res.notFound = function notFound() {
    const err = new Error('Not Found');
    err.status = 404;
    throw err;
  };

  res.badRequest = function badRequest(url, error) {
    console.log(error);
    return res.redirect(url);
  };

  next();
}

module.exports = customResponses;
