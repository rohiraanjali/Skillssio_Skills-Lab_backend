const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const { ObjectId } = mongoose.Schema.Types; 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: "Email id is required",
        unique: "Account already registered with this email. PLease login.",
        validate: {
            validator: function(input) {
            return /^.+@.+\.com$/.test(input);
            },
            message: props => `${props.input} is not a valid email`,
        }
    },

    password: {
        type: String,
        required: "password is a required field",
        validate: {
            validator: function(input) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(input);
            },
            message: props => `Check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter`,
        } 
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    profilePicture: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    history:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    watchLater:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    playLists:[
        {
            name:{ 
                type:String,
                required:true,
                trim:true
            },
            videos :[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }]
        }
    ]
},
{
    timestamps: true
})
    userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

    userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

    const Users = mongoose.model("User", userSchema);

    module.exports = Users; 