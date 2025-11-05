const { pool } = require("../db");
const tableName = "categories";
async function getAllCategories() {
  const result = await pool.query(`SELECT * FROM ${tableName} `);
  return result.rows;
}
async function getCategoryById(id) {
  const result = await pool.query(
    `SELECT * FROM ${tableName} where id = ${id} `
  );
  return result.rows?.[0];
}

async function createCategory(dto) {
  const { name, description, photo } = dto;
  const result = await pool.query(
    `INSERT INTO ${tableName} (name,description, photo ) VALUES ($1, $2, $3) RETURNING *`,
    [name, description, photo]
  );
  return result.rows[0];
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
};
