import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
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

const User=mongoose.model('user',userSchema);
export default User;