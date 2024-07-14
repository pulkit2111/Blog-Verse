import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required: true
    },
    createdDate:{
        type:String
    },
    likes:{
        type: Array
    },
    comments:{
        type: Array
    }

})

const Post=mongoose.model('post',postSchema);
export default Post;