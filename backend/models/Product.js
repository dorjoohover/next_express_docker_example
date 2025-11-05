const { pool } = require("../db");
class Product {
  #tableName = "products";

  async getAllProducts({ limit, page }) {
    const result = await pool.query(
      `SELECT * FROM ${
        this.#tableName
      }  LIMIT ${limit} OFFSET ${page} * ${limit}`
    );
    return result.rows;
  }

  async getProductById(id) {
    const result = await pool.query(
      `SELECT * FROM ${this.#tableName} WHERE id = $1`,
      [id]
    );
    return result.rows?.[0];
  }
  async getProductByName(name) {
    const result = await pool.query(
      `SELECT * FROM ${this.#tableName} WHERE lower(name) = $1`,
      [name.toLowerCase()]
    );
    return result.rows?.[0];
  }

  async createProduct(dto) {
    const { name, price, quantity } = dto;
    if (price <= 0) throw new Error("үнийн дүн 0-с их байх ёстой", 400);

    const product = await this.getProductByName(name);
    if (product) throw new Error("Бүртгэлтэй бүтээгдэхүүн", 400);
    const result = await pool.query(
      `INSERT INTO ${this.#tableName} (name, price, quantity)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, price, quantity]
    );
    return result.rows[0];
  }
}

module.exports = Product;
