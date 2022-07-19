const userController = require('./userController');
const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  //get user from res.locals
  const user = res.locals.user
  //create token and save in cookie
  res.cookie('token', createToken(user));
  //save userType and id as well
  res.cookie('id', user._id)
  res.cookie('userType', user.userType);
  next()
};

cookieController.setZipcode = (req, res, next) => {
  //need to get zipcode from res.locals.user
  res.cookie('zipcode', res.locals.user.zipcode);
  next()
}
cookieController.logout = (req, res, next) => {

}
const createToken = (user) => {
  //create token
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
    //token will look like the following
    //Authorization: Bearer <ACCESS_TOKEN_SECRET>
  return token;
}
module.exports = cookieController;