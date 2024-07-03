import mongoose from "mongoose";

const profileSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
   },
    about:{
        type:String
    },
    picture:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    subscribers:{
        type: Number
    },
    blogs:{
        type: Number
    }

})

const Profile=mongoose.model('profile',profileSchema);
export default Profile;