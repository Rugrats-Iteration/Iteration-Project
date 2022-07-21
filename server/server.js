require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('../database/conn.js');


const tokenVerifier2 = require('./middlewares/verifyTokenController');
const stripeController = require('./controllers/stripeController');
const menuController = require('./controllers/menuController');
//CHANGES MADE
const authRoute = require('./routes/authRoute.js')
const dashboardRoute = require('./routes/dashboardRoute.js')
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;


//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', authRoute);
app.use('/api', dashboardRoute)

// static serve dist folder
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// static serve html on root
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// 404 catch all handler
app.use('*', (req, res) => {
  return res.status(404).send('Unknown Route');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { error: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('errorObj ==>', errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  db();
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
