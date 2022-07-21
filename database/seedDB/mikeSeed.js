const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const seedPort = process.env.SEED_PORT || 5000;
const Menu = require('../models/MenuModel');

const app = express();

// connect to Rugrats database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () =>
  console.log('Connected and Seeding to Rugrats Database...')
);

const testMenu = {
    kitchen_name: "62d78a3314840d4edb7e80a9",
    menu: [ {
        dishName: "Water",
        descriptions: "Dasani Water",
        price: ".99",
        quantity_available: "10",
    },
        { 
      dishName: "Crackers",
      descriptions: "Salted Crackers",
      price: ".25",
      quantity_available: "5",
    }],
}

const seedDB = async () => {
    await Menu.create(testMenu);
    await console.log('Database successfuly seeded');
  };

  seedDB().then(() => {
    console.log('Closing Database Connection');
    mongoose.connection.close();
  });
  
  // connect to server
  app.listen(seedPort, () => {
    console.log(`Server is listening on port ${seedPort}...`);
  });