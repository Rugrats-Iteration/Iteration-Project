const mongoose = require('mongoose');
require('dotenv').config();

const conn = () => {
  mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('Connected to Rugrats Database...');
  });
}

module.exports = conn;
