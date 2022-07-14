require('dotenv').config(); 
const { Pool } = require('pg');
console.log('connection is=>', process.env.PG_URI);

// create a new pool here using the connection string above
// const client = new Client({
//   connectionString: PG_URI,
// });
const pool = new Pool({
  connectionString: process.env.PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    //console.log('executed que');
    return pool.query(text, params, callback);
  },
};
