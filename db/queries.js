const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function clearDatabase() {
    await pool.query("DELETE FROM usernames");
}

async function search(searchInput) {
    await pool.query("SELECT * FROM usernames WHERE username LIKE '%($1)%'", [searchInput]);
}

module.exports = {
  getAllUsernames,
  insertUsername,
  clearDatabase,
  search
};