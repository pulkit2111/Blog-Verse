import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    picture:{
        type:String
    },
    email:{
        type:String
    },
    category:{
        type:String
    },
    createdDate:{
        type:String
    },

},  {timestamps: true})

const Post=mongoose.model('post',postSchema);
export default Post;