
const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'itemsdb',
  password: '12345@NOT',
  port: 5432,
});

module.exports = pool;
