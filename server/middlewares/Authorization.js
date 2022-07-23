require('dotenv').config();
const jwt = require('jsonwebtoken');
//if kithen or customer wants to check their personal profile, make updates, or delete their info
const auth  = async (req, res, next) => {
  //check if there is an authorization token in header

  const cookieToken = req.headers.authorization.split(" ")[1]
  // const cookieToken = req.cookies.token;
  if(!cookieToken) {
    next({
      status: 403,
      message: {err: 'No token in cookies'},
    })
  }
  else {
    await jwt.verify(cookieToken, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
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

