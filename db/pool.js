const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: "postgresql://theo:789520@localhost:5432/top_users"
});