const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "123456", //para funcionar poner su propia passwd de psql
  host: "localhost",
  port: 5432,
  database: "dolcetentazione"
});

module.exports = pool;