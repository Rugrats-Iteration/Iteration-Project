const mongoose = require('mongoose');
require('dotenv').config();

const conn = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Rugrats Database...'));

module.exports = conn;
