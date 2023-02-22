//pg
const Pool = require("pg").Pool;

const pool = new Pool({
  //configs
  user: "postgres",
  password: "123",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

//export
module.exports = pool;
