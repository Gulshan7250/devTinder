const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post('/signup', async (req, res) => {
    const userObj = {
        firstName: "Virat",
        lastName: "Kohli",
        emailId: "viratkohli123@gmail.com",
        password: "Virat@123",
        age: 56
    }
    // Creating a new instance of the User model
    const user = new User(userObj);

    try{
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(400).send("Error saving the user: " + err.message);
    }
});

connectDB()
.then(() => {
    console.log("Database connection established....");
})
.catch((err) => {
    console.log('Database cannot be connected!!');
});

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000....");
});