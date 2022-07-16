const { Pool } = require("pg");
const { Client } = require("pg");
require("dotenv").config();
const connection =
  "postgres://tfvpzqea:HfHlEUxx4EOZkcuNQ4z5ucsphQYy6HGd@chunee.db.elephantsql.com/tfvpzqea"; // config generates process.env

console.log("connection is=>", connection); // create a new pool here using the connection string above
const client = new Client({
  connectionString: connection,
});

const pool = new Pool({
  connectionString: connection,
});

module.exports = {
  query: (text, params, callback) => {
    //console.log('executed que');
    return pool.query(text, params, callback);
  },
};
