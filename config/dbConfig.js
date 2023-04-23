const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'us-cdbr-east-06.cleardb.net',
	user: 'b47b174ebf998d',
	password: '340326fc',
	database: 'heroku_8b885150d94607e',
});

module.exports = db;
