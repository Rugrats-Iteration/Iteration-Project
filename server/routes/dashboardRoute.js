const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController.js');
const menuController = require('../controllers/newMenuController.js');
const cookieController = require('../controllers/cookieController.js');
const auth = require('../middlewares/Authorization.js');

//serve logged in user feed data
router.get(
  '/feed', 
  auth, 
  userController.kitchens, 
  menuController.getAllDishes, 
  (req, res) => {
  res.status(200).json(res.locals.kitchens);
}
);
//need to change cookie state label on line 48 from userId to id to trigger rerendering after login
//once user logs in, set user zipcode
router.post(
  '/zipcode',
  auth,
  userController.zipcode,
  cookieController.setZipcode,
  (req, res) => {
    res.status(200).send('Successfully added zipcode');
  }
);
module.exports = router;
