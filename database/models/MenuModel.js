const { Menu } = require('@material-ui/core');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Option using Maps
 * 
 *  - relational connection to User (Seller) -> kitchen_name
 * 
 * this option seems more feasible and I believe it is structured correctly. The dishes will be separated by dish_name,
 * and nested within the menu that is attached to the kitchen.
 * 
 * food for thought (pun intended) -> should we consider a Map for nested schemas for the Kitchen. i.e Kitchen -> nested Schema (Menu) -> nested Schema (Dish)
 * this can allow for multiple menues (Entrees, Apps, Desserts, Drinks, etc..) to be nested within 1 kitchen.
 */

const menuSchema = new Schema ({
    kitchen_name: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dish: {
        type: Map,
        of: new Schema ({
            dish_name: String,
            description: String,
            price: String,
            quantity_available: String,
            dish_photo_url: String,
        }),
    },
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
