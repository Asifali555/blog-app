import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email :{
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail, "Please enter a valid email"],
    },
    phone: {
        type: Number,
        required: true,
        unique: true
     },
    // photo: {
    //     type: String,
    //     requires: true,
    // },
    photo: {
        public_id:{
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    education: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        requied: true,
        enum:["user", "admin"],
    },
    password: {
        type:String,
        required: true,
        select: false,
        minlength:8,
    },
    token:{
        type:String,
    },
    
    //This will tell when the user has been created
    createdAt:{
        type:Date,
        default:Date.now,
    }

})

export const User = mongoose.model("User", userSchema)