const pool = require("../db/db");

const productService = {
  createANewProduct: async (
    product_name,
    available_quantity,
    price,
    user_id
  ) => {
    const [rows] = await pool.query(
      "INSERT INTO products (product_name,available_quantity, price, user_id ) VALUES (?, ?, ?, ?)",
      [product_name, available_quantity, price, user_id]
    );
    return rows;
  },
  findProductById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return rows;
  },
  findProductByUserId: async (user_id) => {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE user_id = ?",
      [user_id]
    );
    return rows;
  },
  updateProductQuantity: async (id, available_quantity) => {
    const [rows] = await pool.query(
      "UPDATE products SET available_quantity = ? WHERE id = ?",
      [available_quantity, id]
    );
    return rows;
  },
  findProductByName: async (product_name) => {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE product_name = ?",
      [product_name]
    );
    return rows;
  },
};

module.exports = productService;
