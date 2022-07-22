const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street_name: { type: String },
  street_number: { type: Number },
  zipcode: { type: String },
  city: { type: String },
  state: { type: String },
  // must contain reference to user
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Address', addressSchema);
