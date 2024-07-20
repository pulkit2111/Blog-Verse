import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../schema/user.js';

dotenv.config();

export const authenticateToken= async(req,res,next)=>{ //next comes only in middleware function to call the actual callback function after doing the middle work
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //go to inspect->application->localStorage->localhost:3000 where we can see access token and refresh token, containing Bearer <token> hence we need the second element that is token

    if(token == null)
    {
        console.log("no token found!");
        return res.status(401).json({msg: 'token is missing'});
    }
    const secretKey = process.env.ACCESS_SECRET_KEY;
    try {
        const decodedToken = jwt.verify(token, secretKey);
        console.log('decodedToken: ', decodedToken);
        req.user = await User.findById(decodedToken._id);
        next();
    } catch (error) {
        res.sendStatus(403);
    }
}