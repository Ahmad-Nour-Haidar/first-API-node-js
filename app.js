const express = require('express');
const {notFound, errorHandler} = require('./middleware/errors')
const logger = require('./middleware/logger');
const connectDB = require('./config/db');
require('dotenv').config();

// initialize app
const app = express();

// Connect to DB
connectDB();


// Apply Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);

// Routes
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT  || 8000;
// const port = 8000;
app.listen(port, function () {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});
