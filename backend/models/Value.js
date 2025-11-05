const { pool } = require("../db");
class Value {
  #tableName = "values";

  async getAllValues({ limit, page }) {
    const result = await pool.query(
      `SELECT * FROM ${
        this.#tableName
      }  LIMIT ${limit} OFFSET ${page} * ${limit}`
    );
    return result.rows;
  }

  async getValueById(id) {
    const result = await pool.query(
      `SELECT * FROM ${this.#tableName} WHERE id = $1`,
      [id]
    );
    return result.rows?.[0];
  }
  async getValueByName(name) {
    const result = await pool.query(
      `SELECT * FROM ${this.#tableName} WHERE lower(name) = $1`,
      [name.toLowerCase()]
    );
    return result.rows?.[0];
  }

  async createValue(dto) {
    const { name } = dto;
    if (!name || name.length == 0) throw new Error("Утга байх ёстой", 400);

    const value = await this.getValueByName(name);
    if (value) throw new Error("Бүртгэлтэй", 400);
    const result = await pool.query(
      `INSERT INTO ${this.#tableName} (name)
       VALUES ($1) RETURNING *`,
      [name.toLowerCase()]
    );
    return result.rows[0];
  }
}

module.exports = Value;
