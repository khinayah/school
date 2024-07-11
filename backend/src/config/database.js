const mysql = require('mysql2');

const dbPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT,
    database: process.env.DB_NAME || 'school',
});

module.exports = dbPool.promise();