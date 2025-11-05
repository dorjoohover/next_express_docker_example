const { pool } = require("../db");
const tableName = "users";

async function getAllUsers() {
  const result = await pool.query(`SELECT * FROM ${tableName}`);
  return result.rows;
}

async function getUserById(id) {
  const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [
    id,
  ]);
  return result.rows?.[0];
}

async function getUserByPhone(email) {
  const result = await pool.query(
    `SELECT * FROM ${tableName} WHERE email = $1`,
    [email]
  );
  return result.rows?.[0];
}

async function createUser(dto) {
  const { username, password, email, role, phone } = dto;
  const result = await pool.query(
    `INSERT INTO ${tableName} (username, password, phone, email, role)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [username, password, phone, email, role || 10]
  );
  return result.rows[0];
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByPhone,
  createUser,
};
