const { Pool } = require("pg");

const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
};


// import { Pool } from "pg";

// const pool = new Pool({
//   user: "postgres",
//   host: "database.server.com",
//   database: "yelp",
//   password: "password123",
//   port: 5432,
// });

// export const query = (text, params) => pool.query(text, params);
