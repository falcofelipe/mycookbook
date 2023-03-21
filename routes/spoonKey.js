require('dotenv').config();
const express = require('express');
const router = express.Router();

/* Only runs in production, to access heroku config files */
router.get('/', (req, res) => {
	res.send(process.env.SPOON_KEY);
});

module.exports = router;
