const userController = require('./userController');
const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  //get user from res.locals
  const user = res.locals.user
  //create token and save in cookie
  res.cookie('token', createToken(user, res));
  //save userType and id as well
  res.cookie('id', user._id)
  res.cookie('userType', user.userType);
  console.log('finished setting cookie')
  next()
};

cookieController.setZipcode = (req, res, next) => {
  //need to get zipcode from res.locals.user
  res.cookie('zipcode', res.locals.zipcode);
  next()
}
cookieController.logout = (req, res, next) => {

}
const createToken = (user, res) => {
  //create token
  //token will look like the following
  //Authorization: Bearer <ACCESS_TOKEN_SECRET>
  const token = jwt.sign(
    {
      _id: user._id,
      userType: user.userType,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 86400,
    }
  );
  //save verified user info
  res.locals.verifiedUser = {...user._doc, token};
  return token;
}
module.exports = cookieController;