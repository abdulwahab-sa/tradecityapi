module.exports = {
	HOST: 'us-cdbr-east-06.cleardb.net',
	USER: 'b47b174ebf998d',
	PASSWORD: '340326fc',
	DB: 'heroku_8b885150d94607e',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
