const asyncHandler = require("express-async-handler");
const Users = require("../models/users.model"); 
const generateToken = require("../middlewares/createToken");

const registerUser = asyncHandler(async(req, res) => {
const {name, email, password, profilePicture} = req.body;

const userExists = await Users.findOne({ email });
if(userExists) {
    return res.status(500).json({
        message: "Email address is already registered"
     })
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
        message: "Hurray!!! User registered sucessfully"
    })
} else {
    return res.status(400).json({
        message: "Some error occured. Try again."
     })
}
})

const authUser = asyncHandler(async(req,res) => {
    const {email , password } = req.body;

    const userExists = await Users.findOne({ email })

    if(userExists && (await userExists.matchPassword(password))) {
        res.json({
        _id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        password: userExists.password,
        profilePicture: userExists.profilePicture,
        token: generateToken(userExists._id)
        })
    }
    else {
        return res.status(500).json({
            message: "Invalid Email or password"
         })
    }
})

const checkUser = async(req, res, next, uid) => {
const usercheck = await Users.findOne({_id: uid},{password:0,createdAt:0,updatedAt:0,__v:0}).lean()
.populate({path: "history", model: "Video"})
.populate({path: "watchLater", model: "Video"})
.populate({path: "payLists", populate: {path: "videos" , model:"Video"}})

if(usercheck) {
    req.usercheck = usercheck;
    console.log(usercheck)
    next();
    return;
}
return res.status(500).json({message: "User not found"})
}

module.exports = {registerUser, authUser , checkUser}