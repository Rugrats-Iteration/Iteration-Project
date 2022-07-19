const { Router } = require('express');
const userController = require('../controllers/userController.js')
const cookieController = require('../controllers/cookieController.js')
const auth = require('../middlewares/Authorization.js')
const router = Router();
//CHANGE FRONT-END SELLER SIGNUP TO 
// const [userType, setType] = useState("");
//   const [success, setSuccess] = useState(false);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // fetch here
//     axios
//       .post("/api/signup", {
//         username,
//         email,
//         password,
//         userType: "kitchen",
//       })
//       .then((response) => {
//         // clear form
//         setEmail("");
//         setUsername("");
//         setPassword("");
//         setType("");
//         // set "success" in state
//         setSuccess(true);
//       })
//       .catch((error) => {
//         // handle error
//         console.log("hit error response");
//         console.log(error);
//       })
//       .then(() => {
//         console.log("end of fetch in signup");
//         // always executed
//       });
//   };
router.post('/signup', userController.createUser, cookieController.setCookie, 
  (req, res) => {
    res.status(200).json(res.locals.verifiedUser);
  })

router.post('/login', userController.login, cookieController.setCookie, 
  (req, res) => {
    res.status(200).json(res.locals.verifiedUser);
  })
//need to change cookie state label on line 48 from userId to id to trigger rerendering after login
router.post('/zipcode', 
  auth,
  userController.zipcode,
  cookieController.setZipcode,
  (req, res) =>{
    res.status(200).json('Successfully added zipcode');
  }
)
module.exports = router;