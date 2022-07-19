const { Router } = require('express');
const userController = require('../controllers/userController.js')
const cookieController = require('../controllers/cookieController.js')
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
    res.status(200).send('Account Created');
  })

// router.post('/signin', )

module.exports = router;