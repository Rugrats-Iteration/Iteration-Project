const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const seedPort = process.env.SEED_PORT || 3001;
const User = require('../models/UserModel');
const userseedDB = require('./userSeed');

const app = express();

// connect to Rugrats database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () =>
  console.log('Connected and Seeding to Rugrats Database...')
);

const seedDB = async () => {
  await User.create(userseedDB);
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
