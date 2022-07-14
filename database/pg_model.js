const { Pool } = require('pg');
const { Client } = require('pg');
require('dotenv').config();
const connection = process.env.PSQL_URI; // config generates process.env

console.log('connection is=>', connection)// create a new pool here using the connection string above
const client = new Client({
    connectionString: connection,
  });
  
const pool = new Pool({
  connectionString: connection,
})
    
    
module.exports = {
 query: (text, params, callback) => {
 //console.log('executed que');
 return pool.query(text, params, callback);
  },
};