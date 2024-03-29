const express = require('express');
const {notFound, errorHandler} = require('./middleware/errors')
const logger = require('./middleware/logger');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

// initialize app
const app = express();

// Connect to DB
connectDB();

// Static Folder
app.use(express.static(path.join(__dirname, "images")));

// Apply Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors())

// Set View Engine
app.set('view engine', 'ejs');

// Routes
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));
app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 8000;
// const port = 8000;
app.listen(port, function () {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});
