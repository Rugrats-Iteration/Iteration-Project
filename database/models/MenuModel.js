const { Menu } = require('@material-ui/core');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema ({
  kitchen_name: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  menu: [ {
    dishName: String,
    description: String,
    price: String,
    quantity_available: String,
    dish_photo_url: String,
  }],
});

module.exports = mongoose.model('Menu', menuSchema);


/**
 * "Set" example for the menuSchema
 */
// Menu.dish.set({
//     "dish_name": "Pizza",
//     "description": "It's Pizza",
//     "price": "150",
//     "quantity_available": "10",
//     "dish_photo_url": "not available"
// });

// Menu.save();

// Menu.dish.set("Pizza", ["it's pizza", "150", "10", "not available" ]);
// Menu.save();

// ****** //

// // callbacks to convert price from pennies to dollars and cents
// function getPrice(num){
//     return (num/100).toFixed(2);
// }

// function setPrice(num){
//     return num*100;
// }
