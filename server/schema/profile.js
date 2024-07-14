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
    bgPicture:{
        type: String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type: Number
    },
    subscribers:{
        type: Array
    },
    subscriptions:{
        type: Array
    }
})

const Profile=mongoose.model('profile',profileSchema);
export default Profile;