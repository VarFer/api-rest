const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const secretKey = process.env.SECRET_KEY;
const expiresIn = parseInt(process.env.EXPIRES_IN, 10);

module.exports = {
    db,
    secretKey,
    expiresIn
};
