const express = require("express");
const {adminAuth} = require("./middleware/auth");

const app = express();

// Handle Auth Middleware for all GET POST, .... requests
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
    res.send("All Data sent");
});

app.get('/user', (req, res)=>{
    res.send("Data is sent");
})

app.get("/admin/deleteUser", (req, res)=>{
    res.send("Deleted a user");
})

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000....");
});