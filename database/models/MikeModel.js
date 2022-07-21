const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const testuserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    userType: {type: String, required: true, enum: ['customer', 'kitchen']},
    customerZip: {type: String},
    kitchen: {type: Schema.Types.ObjectId, ref: 'Kitchen'}
});
//middlware called directly before any user is saved to DB
testuserSchema.pre('save', function(next){
    const user = this;
    //only hash password if user has modified pass or is new
    if(!user.isModified('password')) next();
    //generate salt and hash pass
    bcrypt.hash(user.password, SALT_WORK_FACTOR)
      .then(hash => {
        //reassign user pass to new hash
        user.password = hash
        return next()
      })
      .catch(err => next(err))
  });

module.exports = mongoose.model('TestUser', testuserSchema);


const kitchenSchema = new Schema({
    kitchen_id: Number,
    name: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'TestUser', required: true},
    address: {
        coord: {
            x: String,
            y: String,
        },
        street: String,
        building: String,
        city: String,
        state: String,
        zipcode: String
    },
    cuisine: String,
    menu: [ {
        dishName: String,
        description: String,
        price: String,
        quantity_available: String,
        dish_photo_url: String,
    }],
    market_enabled: Boolean,
});

module.exports = mongoose.model('Kitchen', kitchenSchema);