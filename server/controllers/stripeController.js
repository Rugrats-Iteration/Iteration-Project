<<<<<<< HEAD
const stripe = require("stripe")(process.env.STRIPE_KEY);
const db = require("../../database/pg_model.js");
=======
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
// const db = require('../../database/pg_model.js');
>>>>>>> imma/menuController

const stripeController = async (req, res, next) => {
  // Destructure what was sent in the request body
  const { dishes } = req.body;
  // dishes will be an object
  console.log('dishes object is =>', )
  const lineItemsArr = [];
  for (let dishId in dishes) {
    // get price for each dish
    const params = [dishId];
<<<<<<< HEAD
    sqlDishQuery = `select * from public.dishes where pk_dish_id = $1`;
    dishData = await db.query(sqlDishQuery, params);
=======
    const sqlDishQuery = `select * from public.dishes where pk_dish_id = $1`;
    const dishData = await db.query(sqlDishQuery, params);

>>>>>>> imma/menuController
    const newItem = {
      price_data: {
        currency: "usd",
        product_data: {
          name: dishes[dishId].name,
        },
        // Price comes with a $ sign, this is why we used slice. Stripe takes price in cents thus *100
        unit_amount: Number(dishData.rows[0].price.slice(1).replace(/,/g, "")) * 100,
      },
      quantity: dishes[dishId].quantity,
    };
    lineItemsArr.push(newItem);
  }
  console.log(
    "---------------------------------------------------------------------------------------"
  );

  try {
    const checkoutObj = {
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItemsArr,
      success_url: "http://localhost:8080/",
      cancel_url: "http://localhost:8080/feed",
    };

    console.log(checkoutObj, "omo");
    const session = await stripe.checkout.sessions.create(checkoutObj);
    res.locals.session = session;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = stripeController;
