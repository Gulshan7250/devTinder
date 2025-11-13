const express = require("express");

const app = express();

// This will only handle GET call to /user
app.get("/user/:userId/:name/:password", (req, res)=>{
    console.log(req.params);
    res.send({firstName: "Gulshan", lastName: "Yadav"});
})

// this will match all the HTTP method API calls to /
app.use("/", (req, res)=>{
    res.send("Namaste Gulshan");
})

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000....");
});