const { Router } = require('express');
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const auth = require('../middlewares/Authorization.js');
const router = Router();

router.post(
  '/signup',
  userController.createUser,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).json(res.locals.verifiedUser);
  }
);

router.post(
  '/login',
  userController.login,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).json(res.locals.verifiedUser);
  }
);

module.exports = router;
