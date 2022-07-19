require('dotenv').config();
const jwt = require('jsonwebtoken');
//if kithen or customer wants to check their personal profile, make updates, or delete their info
const auth  = (req, res, next) => {
  //check if there is an authorization token in header
  const bearerHeader = req.headers['authorization'];
  if(!bearerHeader) {
    next({
      status: 403,
      message: {err: 'Token expired'},
    })
  }
  else {
    //split bearerHeader string at the space, creates an array where token will be in 2nd el
    const token = bearerHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
      if(err) {
        next({
          status: 403,
          message: {err: 'Invalid token'},
          log: 'Invalid token'
        })
      } else {
        //send the authenticated data
        res.locals.verified = auth
        next()
      }
    })
  }
}

module.exports = auth;

