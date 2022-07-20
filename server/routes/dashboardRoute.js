const {Router} = require('express');
const router = Router();
const userController = require('../controllers/userController.js')
const cookieController = require('../controllers/cookieController.js')
const auth = require('../middlewares/Authorization.js')
//need to change cookie state label on line 48 from userId to id to trigger rerendering after login
router.post('/zipcode', 
  auth,
  userController.zipcode,
  cookieController.setZipcode,
  (req, res) =>{
    res.status(200).json('Successfully added zipcode');
  }
)
module.exports = router