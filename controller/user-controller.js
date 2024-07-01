import User from '../schema/user.js';
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
        const newUser = new User({ name, phone, email, password });
        await newUser.save();

        // Send a success response
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully' });
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

export const loginUser = async(req,res) =>{
    let user=await User.findOne({email:req.body.email});
    if(!user){
        console.log('user doesnot exist!');
        return res.status(400).json({msg: 'Email does not exist!'});
    }
    try{
        let match = await bcrypt.compare(req.body.password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
            const refreshToken=jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
        
            const newToken = new Token({token: refreshToken});
            await newToken.save();

            console.log('Yes you are a user.');
            return res.status(200).json({accessToken: accessToken, refreshToken:refreshToken, name:user.name, email:user.email});
        }
        else{
            return res.status(400).json({msg: 'Password does not match!'});
        }
    }catch(error){
        return res.status(500).json({msg: 'Error while login in user'});
    }
}