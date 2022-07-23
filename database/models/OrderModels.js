const mongoose = require('mongoose');
const Schema = mongoose.Schema


//what info do we want in each customer order?
//time ordered
//customer id
//total price
//array of the different dishes
//kitchen name
const customerOrderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    _ref: 'User',
    get ref() {
      return this._ref;
    },
    set ref(value) {
      this._ref = value;
    },
  },
  //place the ids of the dishes inside the items
  //aids with data normalization
  //if we wish to actually see the data related to the dish itself, would have to use mongoose.populate
  totalItems: [{type: Schema.Types.ObjectId, ref: 'dish'}],
  timestamps: {createdAt: 'ordered_at'},
  //kitchen id also references userId but represents the seller
  kitchenId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  // totalPrice
})



//PERSONAL NOTES
//instead of storing, we can use populate to see the information
//not ideal since if we want to keep querying certain data. (SQL alternative)
// ex. customerOrder.findOne({})
//     .populate('totalItems')
//     .exec((err, item) =>{
//         console.log('total id is')
//     })