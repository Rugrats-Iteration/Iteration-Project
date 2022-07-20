const {Router} = require('express');
const router = Router();
const userController = require('../controllers/userController.js')
const cookieController = require('../controllers/cookieController.js')
const auth = require('../middlewares/Authorization.js')
// app.get(
//   '/feed',
//   tokenVerifier2,
//   userController.sellerInformation,
//   (req, res) => {
//     res.status(200).json(res.locals.data);
//   }
// );

//serve logged in user feed data
router.get('/feed',
  auth,
  userController.kitchenInfo, 
  (req, res) => {
    res.status(200).json(res.locals.kitchenInfo)
  }
)
//need to change cookie state label on line 48 from userId to id to trigger rerendering after login
//once user logs in, set user zipcode
router.post('/zipcode', 
  auth,
  userController.zipcode,
  cookieController.setZipcode,
  (req, res) =>{
    res.status(200).send('Successfully added zipcode');
  }
)
module.exports = router