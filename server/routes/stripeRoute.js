const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController')


router.post('/checkout', stripeController, (req, res) => {
  res.status(200).json({ url: res.locals.session.url });
});

module.exports = router;