const pool = require("../db/db");

const orderService = {
  createANewOrder: async (
    amount,
    quantity,
    total_amount,
    product_id,
    customer_id
  ) => {
    try {
      return await pool.query(
        "INSERT INTO orders (amount, quantity, total_amount, product_id, customer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
        [amount, quantity, total_amount, product_id, customer_id]
      );
      
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = orderService;
