const router = require('express').Router();
const urlController = require('../controllers/urls');

router.route('/')
  .get(urlController.index)
  .post(urlController.create);

router.route('/r/:alias')
  .get(urlController.show);

// router.all('*', (req, res) => res.notFound());

module.exports = router;