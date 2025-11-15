const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Gulshan7250:Gulshan725044@devtinder.2vj6xhi.mongodb.net/devTinder"
    );
};

module.exports= connectDB;