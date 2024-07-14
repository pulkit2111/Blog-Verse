import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    picture:{
        type: String
    },
    password:{
        type:String
    },
    googleId:{
        type:String
    }
})

const User=mongoose.model('users',userSchema);
export default User;