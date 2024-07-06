import User from '../schema/user.js';
import Profile from '../schema/profile.js';
import Post from '../schema/post.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../schema/token.js';

dotenv.config();

export const signupUser = async (req, res) => {

    const hashedPassword=await bcrypt.hash(req.body.password,10);
    const name = req.body.name;
    const phone = req.body.phone;
    const email= req.body.email;
    const password=hashedPassword;

    // Validate required fields
    if (!name || !phone || !email || !password) {
        console.log('All fields are required!');
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User with this email already exists');
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        const existingUser2 = await User.findOne({ phone });
        if (existingUser2) {
            console.log('User with this phone already exists');
            return res.status(409).json({ error: 'User with this phone already exists' });
        }

        // Create a new user
        const newUser = new User({ name, phone, email, password});
        await newUser.save();
        const newProfile = new Profile({ name, phone, email});
        await newProfile.save();
        // Send a success response
        console.log('User created successfully');
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);

        // Send a detailed error response
        if (error.code === 11000) {
            console.log('User with this phone or email already exists');
            return res.status(409).json({ error: 'User with this phone or email already exists' });
        }

        // Send a generic error response
        console.log('Failed to create user');
        return res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
};



export const loginUser= async(req,res)=>{
    const user=req.user;

    const accessToken= jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
    const refreshToken=jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

    const newToken = new Token({ userId: user._id, token: refreshToken });
    await newToken.save();

    res.status(200).json({accessToken:accessToken, refreshToken:refreshToken, name:user.name, email:user.email});
}

export const googleCallback= async(req,res)=>{
    const user=req.user;
    const accessToken=jwt.sign( user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn:'15m'})
    const refreshToken = jwt.sign( user.toJSON(), process.env.REFRESH_SECRET_KEY);

    const newToken = new Token({ userId: user._id, token: refreshToken });
    await newToken.save();
    
    res.redirect(`http://localhost:3000/google-callback?accessToken=${accessToken}&refreshToken=${refreshToken}&email=${user.email}&name=${user.name}&picture=${user.picture}`);
}

export const showProfile=async(req,res)=>{
    try{
        const { email } = req.params;
        const user = await Profile.findOne({ email });
        return res.status(200).json(user);
    }catch(error){
        return res.status(400).json({msg: error});
    }
}

export const showUserPosts=async(req,res)=>{
    try{
        const { email } = req.params;
        let posts = await Post.find({ email:email });
        return res.status(200).json(posts);
    }catch(error){
        return res.status(500).json({msg: error});
    }
}

export const updateProfile=async(req,res)=>{
    try{
        const profile=await Profile.findById(req.params.id);
        if(!profile)
        {
            return res.status(404).json({msg:'profile not found'});
        }
        await Profile.findByIdAndUpdate(req.params.id, {$set: req.body}) //$set is used to update the value of object, $addToSet is used to append object
        return res.status(200).json({msg: 'post update successful'})
    }catch(error){
    return res.status(500).json({msg:error});
    }
}

export const subscribe=async(req,res)=>{
    try{
        const userId=req.body[1];
        const authorId=req.body[0];

        if(userId===authorId)
        {
            return res.status(420).json({msg: 'You can not subscribe to yourself'})
        }
        const user= await Profile.findOne({email:userId});
        const author=await Profile.findOne({email : authorId});

        if (!user || !author) {
            return res.status(404).json({ msg: 'User or Author not found' });
        }
        const isPresent = author.subscribers.length && author.subscribers.includes(userId);

        if(isPresent) {

            author.subscribers = author.subscribers.filter(subscriber => subscriber !== userId);
            user.subscriptions = user.subscriptions.filter(subscription => subscription !== authorId);

            await author.save();
            await user.save();

            console.log('Successfully unsubscribed');
            return res.status(401).json({ msg: 'Unsubscribed successfully' });
        }


        author.subscribers.push(userId);
        await author.save();

        user.subscriptions.push(authorId);
        await user.save();

        console.log('Successfully subscribed')
        return res.status(200).json({ msg: 'Subscribed successfully' });
    }catch(error){
        return res.status(500).json({msg:error.message});
    }
}

export const showSubscribers=async(req,res)=>{
    try{
        const {email}=req.params;
        const user=await Profile.findOne({email});
        if(user){
            return res.status(200).json(user.subscribers);
        }
    } catch(error){
        return res.status(500).json({msg:error});
    }
}