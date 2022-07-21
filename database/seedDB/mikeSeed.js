const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const seedPort = process.env.SEED_PORT || 5000;
const Kitchen = require('../models/MikeModel');
const userseedDB = require('./userSeed');

const app = express();

// connect to Rugrats database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () =>
  console.log('Connected and Seeding to Rugrats Database...')
);

const testKitchen = {
    kitchen_id: 0001,
    name: "Test Kitchen",
    owner: "62d88dfec1c204969079a329",
    address: {
        coord: {
            x: "-12345",
            y: "12345"
        },
        street: "123 Fleet Stree",
        building: "1111",
        city: "Mikeville",
        state: "KY",
        zipcode: "12345"
    },
    cuisine: "American",
    menu: [ {
        dishName: "Hotdogs",
        descriptions: "It's a HotDog",
        price: ".99",
        quantity_available: "5",
    },
        { 
      dishName: "Soup",
      descriptions: "It's Soup",
      price: ".50",
      quantity_available: "10",
    }],
    market_enabled: true, 
}

const seedDB = async () => {
    await Kitchen.create(testKitchen);
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