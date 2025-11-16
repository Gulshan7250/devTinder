const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post('/signup', async (req, res) => {
    // Creating a new instance of the User model
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(400).send("Error saving the user: " + err.message);
    }
});

// Get User by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await User.find({emailId: userEmail});
        if(user.length===0){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send("Something went wrong ");
    }
})

// Feed API - GET /feed - get all the users from the database
app.get("/feed",async (req, res) => {
    try{
        const user = await User.find({});
        res.send(user);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
    try{
        const id = req.body.id;
        const user = await User.findByIdAndDelete(id);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

//Update data of the user
app.patch("/user", async (req, res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user= await User.findByIdAndUpdate(userId, data, {
            returnDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send('User update successfully');
    } catch (err){
        res.status(400).send("Something went wrong");
    }
})

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