const {Router} = require('express');
const router = Router();
const newMenuController = require('../controllers/newMenuController.js')
const auth = require('../middlewares/Authorization.js')

// app.post('/db/menu', tokenVerifier2, menuController.createDish, (req, res) => {
//   //adding tokenVerifier2 as the 2nd middleware?
//   res.status(200).json(res.locals.dish);
// });

// app.post('/db/updatemenu', menuController.updateMenu, (req, res) => {
//   //console.log('res.locals.sellerMenu==>', res.locals.sellerMenu);
//   res.status(200).json(res.locals.message);
// });

//get the menu 
router.post('/db/getmenu',
  auth,   
  newMenuController.getMenu,
  (req, res) => {
    res.status(200).json(res.locals.menu);
  }
)

//make updates to the user kitchen
router.post('/db/updatemenu',
  auth,
  newMenuController.updateKitchen,
  (req, res) => {
    res.status(200).json('updating...')
  }
)



module.exports = router