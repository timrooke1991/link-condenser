function customResponses(req, res, next) {

  res.notFound = function notFound() {
    const err = new Error('Not Found');
    err.status = 404;
    throw err;
  };

  res.badRequest = function badRequest() {
    const err = new Error('Validation Error');
    err.status = 400;
    err;
  };

  next();
}

module.exports = customResponses;
