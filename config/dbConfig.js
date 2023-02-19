module.exports = {
	HOST: 'us-cdbr-east-06.cleardb.net',
	USER: 'be768ab8878f38',
	PASSWORD: '8a1a37b4',
	DB: 'heroku_36600a6b89e1b37',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

//mysql://be768ab8878f38:8a1a37b4@us-cdbr-east-06.cleardb.net/heroku_36600a6b89e1b37?reconnect=true
