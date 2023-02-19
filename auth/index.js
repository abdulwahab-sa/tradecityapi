const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const plainPassword = 'Pakistan0011-';

(async () => {
	const hashedPass = await bcrypt.hash(plainPassword, saltRounds);
	users.password = hashedPass;
	console.log(hashedPass);
})();
const users = {
	id: '1',
	username: 'admin',
	password: '',
};

let refreshTokens = [];

const generateAccessToken = (user) => {
	return jwt.sign({ id: user.id, username: user.username }, 'mySecretKey', {
		expiresIn: '40s',
	});
};

const generateRefreshToken = (user) => {
	return jwt.sign({ id: user.id, username: user.username }, 'myRefreshSecretKey');
};

const loginController = async (req, res) => {
	try {
		const { username, password } = req.body;

		const checkPassword = await bcrypt.compare(password, users.password);

		const user = users.username === username && checkPassword;

		if (user) {
			//Generate an access token
			const accessToken = generateAccessToken(user);
			const refreshToken = generateRefreshToken(user);
			refreshTokens.push(refreshToken);
			res.json({
				accessToken,
			});
		} else {
			res.status(400).json('Username or password incorrect!');
		}
	} catch (err) {
		console.error(err);
	}
};

const refreshController = async (req, res) => {
	//take the refresh token from the user

	try {
		const refreshToken = req.body.token;

		//send error if there is no token or it's invalid
		if (!refreshToken) return res.status(401).json('You are not authenticated!');
		if (!refreshTokens.includes(refreshToken)) {
			return res.status(403).json('Refresh token is not valid!');
		}
		jwt.verify(refreshToken, 'myRefreshSecretKey', (err, user) => {
			err && console.log(err);
			refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

			const newAccessToken = generateAccessToken(user);
			const newRefreshToken = generateRefreshToken(user);

			refreshTokens.push(newRefreshToken);

			res.status(200).json({
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
		});
	} catch (err) {
		console.error(err);
	}

	//if everything is ok, create new access token, refresh token and send to user
};

module.exports = { loginController, refreshController };
