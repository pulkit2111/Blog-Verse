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
    const picture = req.body.picture;

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
            return res.status(410).json({ error: 'User with this phone already exists' });
        }

        // Create a new user
        const newUser = new User({ name, phone, email, password, picture});
        await newUser.save();
        const newProfile = new Profile({ name, phone, email, picture});
        await newProfile.save();
        // Send a success response
        console.log('User created successfully');
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
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

export const logout= async(req,res)=>{
    try{
        const userId=req.user._id;
        await Token.deleteMany({userId: userId});
        res.status(200).json({msg:'Tokens deleted successfully.'});
    }catch(error){
        res.status(500).json({msg: 'error logging out'});
    }
}

export const googleCallback= async(req,res)=>{
    const user=req.user;
    const accessToken=jwt.sign( user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn:'15m'})
    const refreshToken = jwt.sign( user.toJSON(), process.env.REFRESH_SECRET_KEY);

    const newToken = new Token({ userId: user._id, token: refreshToken });
    await newToken.save();
    
    res.redirect(`https://bloggverse.netlify.app/google-callback?accessToken=${accessToken}&refreshToken=${refreshToken}&email=${user.email}&name=${user.name}&picture=${user.picture}`);
}

export const refreshToken=async(req,res)=>{
    const {refreshToken}=req.body;
    if(!refreshToken){
        return res.status(403).json({msg: 'no refresh token found!'});
    }
    try {
        const tokenDoc = await Token.findOne({ token: refreshToken });
        if (!tokenDoc) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }
            const { _id, name, phone, email } = user;
            const payload = { _id, name, phone, email };
            const newAccessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            res.status(200).json({ newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
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
