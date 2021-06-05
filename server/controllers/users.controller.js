const asyncHandler = require("express-async-handler");
const Users = require("../models/users.model"); 
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async(req, res) => {
const {name, email, password, profilePicture} = req.body;

const userExists = await Users.findOne({ email });

if(userExists) {
    res.status(400)
    throw new Error('User Already Exists')
}

const newUser = await Users.create({
    name,
    email, 
    password,
    profilePicture
})

if(newUser) {
    res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        profilePicture: newUser.profilePicture,
        // token: generateToken(newUser._id)

    })
} else {
    res.status(400);
    throw new Error("error occured !!")
}
})

const authUser = asyncHandler(async(req,res) => {
    const {email , password } = req.body;

    const newUser = await Users.findOne({ email })

    if(newUser && (await newUser.matchPassword(password))) {
        res.json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        profilePicture: newUser.profilePicture,
        token: generateToken(newUser._id)
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid email or password!")
    }
})

module.exports = {registerUser, authUser}