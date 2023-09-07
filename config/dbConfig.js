require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
	host: process.env.MYSQLHOST,
	user: process.env.MYSQLUSERNAME,
	password: process.env.MYSQLPASSWORD,
	database: process.env.MYSQLDATABASE,
	port: process.env.MYSQLPORT,
});

module.exports = db;
