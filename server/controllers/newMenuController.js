const Menu = require('../../database/models/MenuModel');
//const User = require('../../database/models/UserModel');

const newMenuController = {};

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
      { kitchen_name: req.cookies.id },
      { $push: { menu: req.body } }
    ).then((menu) => {
      console.log('this is the updated menu =>', menu);
      res.locals.menu = menu;
      return next();
    });
  } catch (err) {
    next({
      message: { err },
      log: 'Error in create a new dish in the menu',
    });
  }
};

newMenuController.updateDish = async (req, res, next) => {
  // req.body should contain _id: ObjectId" "
  const { id, updatedDish } = req.body;

  try {
    await Menu.findOneAndUpdate(
      { _id: id },
      { $addToSet: { 'Menu.$[el].menu': updatedDish } }
    ).then((dish) => {
      console.log('this is the updated dish', dish);
      res.locals.dish = dish;
      return next();
    });
  } catch (err) {
    next({
      message: { err },
      log: 'Error in updating a dish from the menu',
    });
  }
};

newMenuController.deleteDish = async (req, res, next) => {
  const { id } = req.body;

  try {
    await Menu.updateOne(
      { _id: id },
      { $pull: { menu: { _id: id } } },
      { 'multi ': true }
    ).then((menu) => {
      console.log('this is the updated menu', menu);
      res.locals.menu = menu;
      return next();
    });
  } catch (err) {
    next({
      message: { err },
      log: 'Error in deleting a dish from the menu',
    });
  }
};

module.exports = newMenuController;
