const Menu = require('../../database/models/MenuModel.js');
const User = require('../../database/models/UserModel.js');
const Address = require('../../database/models/AddressModel.js')

const newMenuController = {};

newMenuController.getMenu = async (req, res, next) => {
  console.log('...getting menu');
  //front end is expecting an object called kicthen menu
  try {
    const kitchenMenu = {};
    //sellerId is coming from the parameter
    const {sellerId} = req.body;
    //perform query for user menu and address, and user
    // menu returns doc with an array of dishes and name of kitchen
    const menuData = await Menu.findOne({kitchen_name: sellerId}).populate('kitchen_name');
    console.log('menu data is =>', menuData);
    const kitchenAddy = await Address.findOne({user: sellerId})
    console.log('addy is =>', kitchenAddy)
    kitchenMenu.kitchenName = menuData.kitchen_name.kitchen_name;
    if (kitchenAddy) {
      kitchenMenu.address = {
        seller_street_name: kitchenAddy.street_name,
        seller_city: kitchenAddy.city,
        seller_state: kitchenAddy.state,
        seller_zip_code: kitchenAddy.zipcode
      }
    }
    kitchenMenu.dishes = {};

    menuData.menu.forEach((el) => {
      const dish = {};
      const dishId = el._id;
      dish.name = el.dishName;
      dish.description = el.description;
      dish.quantity = el.quantity_available;
      dish.image = el.dish_photo_url;
      kitchenMenu.dishes[dishId] = dish;
    })
    console.log('menu is =>', kitchenMenu)

    //save dish menu into res.locals
    res.locals.menu = kitchenMenu;
    next();
  } catch (err) {
    next({
      log: 'Error  in getting kitchen menu',
      message: {err}
    })
  }
  
};

newMenuController.updateKitchen = async (req, res, next) => {
  //expecting kitchen name, address, cusisine, market_enabled
  //menuChanges will be handling by the following middlewares below this one

  //get the id from the cookie
  const {id} = req.cookies.id;
  const {
    //kitchen_name in db
    kitchenName,
    address,
    cuisine, 
    market_enabled
    //need to check 
  } = req.body;
  //if kitchen name exists, input into user model
  if(kitchenName) {
    await User.findOneAndUpdate({_id: id}, {kitchen_name: kitchenName}, {new: true})
  }
  //if cuisine exists
  if(cuisine){
    await User.findOneAndUpdate({_id: id}, {cuisine}, {new: true})
  }
  if(market_enabled) {
    await User.findOneAndUpdate({_id: id}, {market_enabled}, {new: true})
  }
  //if address exists, address is an object from the front-end
  //create an object to act as our insert parameter for query
  const queryParam = {}
  //iterate through address obj and populate query param object
  if(address) {
    for (const prop in address) {
      if (prop === 'seller_street_name') queryParam.street_name = prop.address_seller_street_name
      if (prop === 'seller_state') queryParam.state = prop.address_seller_street_state
      if (prop === 'seller_city') queryParam.city = prop.address_seller_city
      if (prop === 'seller_zip_code') queryParam.zipcode = prop.address_seller_zip_code
    }
  }
  //now that queryParam is populated, update user address
  await Address.findOneAndUpdate({user: id}, queryParam, {new: true});
  next()
};

newMenuController.getAllDishes = async (req, res, next) => {
  try {
    await Menu.find([], (err, dishes) => {
      res.locals.dishes = [dishes];
      return next();
    });
  } catch (err) {
    next({
      message: { err },
      log: 'Error in getAllDishes',
    });
  }
};

newMenuController.createDish = async (req, res, next) => {
  //req.body should contain 
  try {
    await Menu.updateOne(
      { 'kitchen_name': req.cookies.id },
      { $push: { 'menu': req.body } }
    )
      .then(menu => {
        console.log('this is the updated menu =>', menu);
        res.locals.menu = menu
        return next()
      })
  } catch (err) {
    next({
      message: {err},
      log: 'Error in create a new dish in the menu'
    })
  }
};

newMenuController.updateDish = async (req, res, next) => {
  // req.body should contain _id: ObjectId" "
  const { id, updatedDish } = req.body

  try {
    await Menu.findOneAndUpdate(
      {_id: id},
      {$addToSet: { 'Menu.$[el].menu': updatedDish } },
    )
      .then(dish => {
        console.log('this is the updated dish', dish);
        res.locals.dish = dish
        return next()
      })
  } catch (err) {
    next({
      message: {err},
      log: 'Error in updating a dish from the menu'
    })
  }
};

newMenuController.deleteDish = async (req, res, next) => {
  
  const { id } = req.body
  try { 
    await Menu.updateOne(
      {_id: id },
      { '$pull': {'menu': { '_id': id } } },
      { 'multi ': true }
    )
      .then(menu => {
        console.log('this is the updated menu', menu);
        res.locals.menu = menu
        return next()
      })
  }
  catch (err) {
    next({
      message: {err},
      log: 'Error in deleting a dish from the menu'
    })
  }
};

module.exports = newMenuController;