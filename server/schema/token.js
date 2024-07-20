import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' 
    },
    token:{
        type:String,
        required:true
    },
    createdAt: { 
        type: Date,
        default: Date.now, 
        expires: 360000 } //100hour expiration
});

const token = mongoose.model('token', tokenSchema);

export default token;