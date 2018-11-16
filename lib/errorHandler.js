function errorHandler(err, req, res, next) {

  if (err.name === 'ValidationError') {
    err.status = 422;
    err.message = 'Unprocessable Entity';

    const errors = {};
    for (const key in err.errors) {
      errors[key] = err.errors[key].message;
    }
    err.errors = errors;
  }

  err.message = err.message || 'Internal Server Error';
  err.status = err.status || 500;

  res.status(err.status);
  res.json({ message: err.message, errors: err.errors });

  next(err);
}
function hey() { console.log('iojfeiorjgjgiojoi') };
const obj = { hello: 'world', love: true };

module.exports = errorHandler;