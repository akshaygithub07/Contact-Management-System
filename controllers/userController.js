const asyncHandler = require("express-async-handler")
/** @type {import("mongoose").Model} */
const User = require("../models/userModel");

//@desc Register a user
//@route GET /api/users/register
//@access public

const registerUser = asyncHandler(async(req,res) => {
    const {username,email,password} = req.body
    if(!username||!email||!password){
        res.status(400)

        throw new Error("All fields are mandatory")
    }

    const userAvailable = await User.findOne(email);
    if(userAvailable){ 
        res.status(400)
        throw new Error("User is already registered!")
    }

    res.json({message:"Register the user"})
});


//@desc Login a user
//@route GET /api/users/login
//@access public

const loginUser = asyncHandler(async(req,res) => {
    res.json({message:"login the user"})
});

//@desc current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async(req,res) => {
    res.json({message:"current user information"})
});

module.exports = {registerUser,loginUser,currentUser}