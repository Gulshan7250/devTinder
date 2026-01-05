const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: "+ value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password: "+ value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is incorrect status type`,
        },
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    membershipType: {
        type: String,
    },
    about:{
        type: String,
        default: "This is default description of user !!",
    },
    skills:{
        type:[String],
    },
    photoUrl:{
        type: String,
        default: "https://i.pravatar.cc/300"
    }
},
{
    timestamps: true,
});

userSchema.methods.getJWT = async function (){
    const user = this;

    const token =await jwt.sign({_id: user._id}, "DEV@Tinder$790",{
        expiresIn: "7d",
    });
    return token;
}

userSchema.methods.validatePassword = async function (passworInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passworInputByUser,
        passwordHash
    );
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;