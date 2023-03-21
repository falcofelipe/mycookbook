const jwt = require('jsonwebtoken');
require('dotenv').config();

// Checks if the token stored in the header refers to a valid user token.
//  This will only be used for protected routes.
//  Doesn't check user permissions.
module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');

	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded.user;

		next();
	} catch (err) {
		res.status(401).json({ msg: 'Invalid token, authorization denied' });
	}
};
