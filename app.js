const express = require('express');
const bodyParser = require('body-parser');

// Load environment variables
require("dotenv").config();

// create express app
const app = express();
const cors = require('cors');
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());

// connect to the database
require("./config/database_config").connect();

// Routes
app.get('/', function (req, res) {
  res.send('Hello World!');
});
require('./albums/albums_routes')(app);
require('./categories/categories_routes')(app);
require('./songs/songs_routes')(app);
require('./users/users_routes')(app)

// Listen on port from env
app.listen(process.env.PORT);