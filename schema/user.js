import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const User=mongoose.model('user',userSchema);
export default User;