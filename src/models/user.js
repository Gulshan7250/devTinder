const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 40,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"]){
                throw new Error("Gender data is not valid");
            }
        },
    },
    about:{
        type: String,
        default: "This is default description of user !!",
    }
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;