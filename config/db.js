const mongoose = require('mongoose');

// Connect to MongoDB
function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.log('Connected Failed to MongoDB', err));

}

module.exports = connectDB;