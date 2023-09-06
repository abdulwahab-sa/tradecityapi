require('dotenv').config();
const express = require('express');
const router = require('./routes/route.js');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
	origin: '*',
	credentials: true,
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
});

app.use('/api', router);

app.listen(process.env.PORT || 5000, () => {
	console.log('Backend is working!');
});
