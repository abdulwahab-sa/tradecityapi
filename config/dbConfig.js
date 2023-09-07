require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
	host: '135.181.140.122',
	user: 'tradecit',
	password: '3u4iVa6IYR)-d1',
	database: 'tradecit_products',
	port: 3306,
});

module.exports = db;
