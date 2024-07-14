import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken=(req,res,next)=>{ //next comes only in middleware function to call the actual callback function after doing the middle work
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //go to inspect->application->sessionStorage->localhost:3000 where we can see access token and refresh token, containing Bearer <token> hence we need the second element that is token

    if(token == null)
    {
        console.log("no token found!");
        return res.status(401).json({msg: 'token is missing'});
    }
    const secretKey = process.env.ACCESS_SECRET_KEY;
    if (!secretKey) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    jwt.verify(token, secretKey, (error,user)=>{
        if(error) {
            return res.status(403).json({msg: 'invalid token'});
        }
        req.user=user;
        next();
    });
}