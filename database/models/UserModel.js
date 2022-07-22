const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  // determine whether the user is a customer or kitchen
  //enum is a validator that checks if the string val is w/in the array
  userType: { type: String, required: true, enum: ['customer', 'kitchen'] },
  // everything below pertains to kitchen users
  bio: { type: String },
  kitchen_name: { type: String },
  menu: { type: Schema.Types.ObjectId, ref: 'Menu' },
  cusine: { type: String },
  market_enabled: { type: Boolean },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
  },
});
//middlware called directly before any user is saved to DB
userSchema.pre('save', function (next) {
  const user = this;
  //only hash password if user has modified pass or is new
  if (!user.isModified('password')) next();
  //generate salt and hash pass
  bcrypt
    .hash(user.password, SALT_WORK_FACTOR)
    .then((hash) => {
      //reassign user pass to new hash
      user.password = hash;
      return next();
    })
    .catch((err) => next(err));
});

module.exports = mongoose.model('User', userSchema);
