const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
//const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(cors());

// Require and Define router and route handler
const apiRouter = require('./routes/api');
app.use ('/api', apiRouter);

// static serve dist folder
app.use("/dist", express.static(path.join(__dirname, "../dist")));

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
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
