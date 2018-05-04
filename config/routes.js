const router = require('express').Router();
const urlController = require('../controllers/urls');

router.route('/')
  .get(urlController.index)
  .post(urlController.create);

// router.all('*', (req, res) => res.notFound());

module.exports = router;