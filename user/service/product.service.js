const pool = require('../db/db');

const productService = {
    createANewProduct: async (product_name, price, user_id) => {
        const [rows] = await pool.query(
            'INSERT INTO products (product_name, price, user_id) VALUES (?, ?, ?)',
            [product_name, price, user_id]
        );
        return rows;
    },
    findProductById: async (id) => {
        const [rows] = await pool.query(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );
        return rows;
    },
    findProductByUserId: async (user_id) => {
        const [rows] = await pool.query(
            'SELECT * FROM products WHERE user_id = ?',
            [user_id]
        );
        return rows;
    },
};

module.exports = productService;