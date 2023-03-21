const express = require('express');
const formData = require('express-form-data');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

// Init Middleware to handle JSON & File uploads
app.use(express.json({ extended: false }));
app.use(formData.parse());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/spoon/key', require('./routes/spoonKey'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	console.log(path.join(__dirname, './client/build'));

	app.use(express.static(path.join(__dirname, './client/build')));

	// Loads the home page when accessing routes that are not described above
	app.get('*', (req, res) =>
		res.sendFile(
			path.join(__dirname, './client/build/index.html'),
			function (err) {
				res.status(500).send(err);
			}
		)
	);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
