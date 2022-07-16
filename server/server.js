const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
<<<<<<< HEAD
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController');
const tokenVerifier2 = require('./controllers/verifyTokenController');
const stripeRoute = require('./routes/stripeRoute');
const menuController = require('./controllers/menuController');
=======
require('dotenv').config();
//const cookieParser = require('cookie-parser');
>>>>>>> d03cc87a9192d62df17cd32dced562f95b66a985

const app = express();
const PORT = 3000;
const dbConn = require('../database/conn');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(cors());

// Require and Define router and route handler
const apiRouter = require('./routes/api');
app.use ('/api', apiRouter);

<<<<<<< HEAD
app.use('/api', stripeRoute);
=======
// static serve dist folder
app.use("/dist", express.static(path.join(__dirname, "../dist")));
>>>>>>> d03cc87a9192d62df17cd32dced562f95b66a985

// static serve html on root
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

// 404 catch all handler
app.use('*', (req, res) => {
 return res.status(404).send("Unknown Route");
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { error: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('errorObj ==>', errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server then perform database connection
 */
app.listen(PORT, () => {
  dbConn,
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
