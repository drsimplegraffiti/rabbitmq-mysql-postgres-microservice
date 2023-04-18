const pool = require('../db/db');

const userService = {
    createANewUser: async (email, password) => {
        const [rows] = await pool.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password]
        );
        return rows;
    },
    findUserByEmail: async (email) => {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows;
    },
    findUserById: async (id) => {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );
        return rows;
    },
};

module.exports = userService;
