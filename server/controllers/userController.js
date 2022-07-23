const User = require('../../database/models/UserModel.js')
const Address = require('../../database/models/AddressModel.js')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
require('dotenv').config();
//need a function to check if user submitted all the necessary info
//fields is an object, type is is the type of validation 
const userValidation = (reqFields, type, update) => {
  const validate = {
    signup: [
      'email',
      'password',
      'username',
      'userType'
    ],
    login: ['username', 'password']
  }
  //returns a boolean
  return update 
    ? validate[type].some((req) => reqFields[req])
    : validate[type].every((req) => reqFields[req]);
}
//checks user type
const isKitchen = (userType) => {
  //if user type is customer or kicthen
  return (userType === 'kitchen') ?  true : false;
}

//checks password
const verifyPass = async (password, dbPass) => {
  const verified = await bcrypt.compare(password, dbPass)
  return (verified) ? true : false
}
const userController = {};
//create user, no need to have different one for either buyer or seller
userController.createUser = async (req, res, next) => {
  //deconstruct req body to get only the required fields
  try{
    const {
      email, 
      password, 
      username,
      userType
    } = req.body
    //invoke validator to ensure user submitted required fields
    const isValid = userValidation(req.body, 'signup');
    //if user failed to submit all fields, trigger error
    if(!isValid) {
      return next({
        message: { err: 'Please fill in all required fields'},
        log: 'Error in validating the user fields'
      })
    }
    //need to validate that user does not exist already
    await User.findOne({username})
      .then((user) => {
        if(user) {
          return next({
            message: { err: 'User already exists'},
            log: 'User already exists'
          })
        }
      })
      .catch(err => {
        next({
          message: {err},
          log: 'Error in finding pre-existing user before registeration'
        })
      })
    //create the new user
    await User.create({email, password, username, userType})
      .then(user => {
        //after user is created, save into res.locals
        res.locals.user = user
        next();
      })
      .catch(err => {
        return next({
          log: 'Error in creating user',
          message: {err: err}
        })
      })
  }
  catch (error) {
    return next({
      log: 'Error in createUser Middleware',
      message: {err: error}
    })
  }
}


userController.login = async (req, res, next) => {
  //user can login with either email or username
  console.log('logging in...')
  const {username, password} = req.body;
  console.log('password is => ', password);
  try{
    //validate fields
    const isValid = userValidation(req.body, 'login');
    //if user failed to submit all fields, trigger error
    if(!isValid) {
      return next({
        message: { err: 'Please fill in all required fields'},
        log: 'Error in validating the user fields'
      })
    }

    //check if user submitted either username or email
    (username.includes('@')) 
      ? await User.findOne({email: username})
        .then(user => {
          if (!verifyPass(password, user.password)) return res.send('Incorrect Password')
          res.locals.user = user
          if(user.address) res.locals.address = user.address
          // next()
        })
        .catch(err => next({message: {err}, log: 'Could not find user by that email'}))
      : await User.findOne({username})
        .then(user => {
          if (!verifyPass(password, user.password)) return res.send('Incorrect Password')
          res.locals.user = user
          if(user.address) res.locals.address = user.address
          console.log('user addy is=>', res.locals.address)
          // next()
        })
        .catch(err => next({message: {err}, log: 'Could not find user by that username'}));
    //after user logs in, check to see if they have a zipcode already to set the cookie in next middleware
    (res.locals.address) 
      ? Address.findOne({_id: res.locals.address})
        .then(addy => {
          // res.locals.zipcode = addy.zipcode
          // console.log('zipcode is =>', res.locals.zipcode);
          const zip = addy.zipcode
          res.locals.user = {...res.locals.user._doc, zip};
          next()
        })
        .catch(err => {
          next({
            message: {err},
            log: 'Error in finding userZip after user logs in'
          })
        })
      : next()
  }
  catch (err) {
    next({
      log: 'Error in logging in user',
      message: {err}
    })
  }
}

userController.zipcode = async (req, res, next) => {
  //user Id and type should be in the cookies
  console.log('creating zipcode in user address')
  const id = req.cookies.userId;
  console.log('id is =>', req.cookies);
  //if zipcode already exists, just update their zipcode
  await User.findOne({_id: id})
    .then(user => {
      if(user.address){
        res.locals.filter = user.address;
      }
      next()
    })
    .catch(err => {
      next({
        message: {err},
        log: 'Error in locating existing user'
      })
    });
}
userController.updateAddress = async (req, res, next) => {
  const id = req.cookies.userId;
  const {zipcode} = req.body;
  console.log('updating address.. =>', res.locals.filter)
  //update or create zip code 
  if (res.locals.filter){
    Address.findByIdAndUpdate({_id: res.locals.filter}, {zipcode}, {new: true})
      .then(updatedAddy => {
        res.locals.address = updatedAddy._id;
        res.locals.zipcode = zipcode
        next()
      })
      .catch(err => next({message: {err}, log: 'Error in updating existing kitchen zipcode'}))
  } else {
    Address.create({user: id, zipcode})
      .then(newAddy => {
        res.locals.address = newAddy._id;
        res.locals.zipcode = zipcode
        next()
      })
      .catch(err => next({message: {err}, log: 'Error in creating existing kitchen zipcode'}));
  }
}

userController.updateUserDoc = async (req, res, next) => {
  // find user in db and create and update userAddress id
  console.log('updating user doc...')
  const {id} = req.cookies;
  await User.findOneAndUpdate({_id: id}, {$set: {address: res.locals.address}}, {new: true})
    .then(next())
    .catch(err=> {
      next({
        message: {err},
        log: 'Error in finding and updating user with zipcode'
      })
    })
}

userController.kitchens = async (req, res, next) => {
  //ultimately sending all kitchens to the user feed
  //WILL RETURN ARRAY OF OBJECTS INSTEAD OF ONE NESTED OBJECT
  //note to frontend - change useState line 75 on feed to an empty array
  //new function on line 138 of Feed.js as well
  try{
    await User.find({userType: 'kitchen'})
      .then(kitchens => {
        //kitchens are an array of documents
        res.locals.kitchens = kitchens
        return next()
      })
      .catch(err => {
        next({
          message: {err},
          log: 'Error in finding all the kitchen users'
        })
      })
  }
  catch (err) {
    next({
      message: {err},
      log: 'Error in grabbing all the kitchens in the area'
    })
  }
}

//POSTGRES VERSION

// const db = require("../../database/pg_model.js");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userController = {};
// require("dotenv").config();
// userController.sellerInformation = async (req, res, next) => {
//   try {
//     const sqlQuery = `select pk_seller_id, kitchen_name, seller_street_name, seller_street_number, seller_city, seller_zip_code, seller_bio, cuisine, pickup_window_start, pickup_window_end, market_enabled
//    from public.sellers`;
//     const data = await db.query(sqlQuery);
//     console.log(data.rows);
//     const mappedData = {};
//     for (const el of data.rows) {
//       const {
//         pk_seller_id,
//         kitchen_name,
//         seller_street_name,
//         seller_street_number,
//         seller_city,
//         seller_zip_code,
//         seller_bio,
//         cuisine,
//         pickup_window_start,
//         pickup_window_end,
//         market_enabled,
//       } = el;
//       mappedData[pk_seller_id] = {
//         kitchen_name,
//         seller_street_name,
//         seller_street_number,
//         seller_city,
//         seller_zip_code,
//         seller_bio,
//         cuisine,
//         pickup_window_start,
//         pickup_window_end,
//         market_enabled,
//       };
//     }

//     res.locals.data = mappedData;
//     return next();
//   } catch (error) {
//     return next({ message: error.detail });
//   }
// }
// userController.userZip = async (req, res, next) => {
//   // destructuring the request body
//   const userId = req.cookies.userId;
//   const userType = req.cookies.userType;
//   const { zipcode } = req.body;
//   const details = [zipcode, userId];
//   try {
//     console.log('zipcode')
//     //updating the zipcode using the user id
//     const sqlZipQuery = `update ${userType}s 
//       set ${userType}_zip_code = $1 
//       where pk_${userType}_id = $2`;
//     const data = await db.query(sqlZipQuery, details);
//     return next();
//   } catch (error) {
//     return next({ message: error.detail });
//   }
// };

// userController.login = async (req, res, next) => {
//   // Destructuring the username and password
//   const { username, password, userType } = req.body;
//   try {
//     // If "@" exists then an email has been sent
//     let userLoginType = 'nickname';
//     if (username.includes('@')) userLoginType = 'email';

//     const userInfo = [username];
//     let sqlQueryUsername;
//     const type = userType === 'seller' ? 'seller' : 'buyer';
//     // If an email has been sent then we need to search the table using the email column
//     if (userLoginType === 'email') {
//       // checking if the user is a seller or buyer to alter the query
//       if (userType === 'seller') {
//         sqlQueryUsername = 'select * from public.sellers where seller_email = $1';
//       } else {
//         sqlQueryUsername = 'select * from public.buyers where buyer_email = $1';
//       }
//     } else {
//       // If the nickname was sent instead of an email
//       if (userType === 'seller') {
//         sqlQueryUsername = 'select * from public.sellers where seller_nickname = $1';
//       } else {
//         sqlQueryUsername = 'select * from public.buyers where buyer_nickname = $1';
//       }
//     }
//     const data = await db.query(sqlQueryUsername, userInfo);
//     console.log(data.rows[0]);
//     // Checks if data has been found or not
//     if (data.rows[0] === undefined)
//       return res.send('Username/Email does not exist');
//     // If the username/emaiil has been found, it checks if the password matches
//     if (await bcrypt.compare(password, data.rows[0].password)) {
//       const zip = `${type}_zip_code`;
//       const userId = `pk_${type}_id`;
//       res.locals.data = {
//         user_id: data.rows[0][userId],
//         zip: data.rows[0][zip],
//       };
//       return next();
//     } else {
//       return res.send('Password is incorrect');
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

// userController.createSeller = async (req, res, next) => {
//   // Checking the usertype to decide which controller it has to pass through (createSeller vs createBuyer)
//   if (req.body.userType === 'buyer') return next();
//   try {
//     const props = ['seller_email', 'password', 'seller_nickname'];
//     const values = [];
//     // storing the values of the above keys which are received in the body of the request in the values array
//     for (let i = 0; i < props.length; i++) {
//       values.push(req.body[props[i]]);
//     }
//     //Hashing the password
//     const hashedPassword = await bcrypt.hash(values[1], 10);
//     //Change the password to the hashed password in the values array
//     values[1] = hashedPassword;
//     // console.log("values: ", values);
//     const sqlQuery = `INSERT INTO public.sellers 
//     (seller_email, password, seller_nickname, market_enabled) 
//     VALUES ($1, $2, $3, NULL) 
//     RETURNING *;`;
//     const data = await db.query(sqlQuery, values);
//     //res.locals.seller = data.rows[0];

//     return next();
//   } catch (error) {
//     console.log(error.detail);
//     return next({ message: error.detail });
//   }
// };

// userController.createBuyer = async (req, res, next) => {
//   if (req.body.userType === 'seller') return next();
//   try {
//     const props = ['buyer_email', 'password', 'buyer_nickname'];
//     const values = [];
//     // storing the values of the above keys which are received in the body of the request in the values array
//     for (let i = 0; i < props.length; i++) {
//       values.push(req.body[props[i]]);
//     }
//     //Hashing the password
//     const hashedPassword = await bcrypt.hash(values[1], 10);
//     //Change the password to the hashed password in the values array
//     values[1] = hashedPassword;
//     // console.log("values: ", values);
//     const sqlQuery = `INSERT INTO public.buyers 
//     (buyer_email, password, buyer_nickname)
//     VALUES ($1, $2, $3) 
//     RETURNING *;`;
//     const data = await db.query(sqlQuery, values);
//     //res.locals.buyer = data.rows[0];

//     return next();
//   } catch (error) {
//     return next({ message: error.detail }); // how to use global error handler?
//   }
// };
module.exports = userController;
