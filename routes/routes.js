import express from 'express';
import {signupUser, loginUser,googleCallback,logout, refreshToken ,showProfile, showUserPosts, updateProfile} from '../controller/user-controller.js';
import {newBlog, showPosts, showPostById, deletePost, updatePosts} from '../controller/author-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { getRelatedPosts } from '../controller/relatedPost-controller.js';
import { subscribe, showSubscribers, like , putComment} from '../controller/post-controller.js';
import passport from '../controller/passport-controller.js';

const router=express.Router();

router.post('/signup',signupUser);
router.post('/login',passport.authenticate('local'), loginUser);
router.post('/createBlog', authenticateToken,newBlog);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback)
router.get('/getPosts', authenticateToken,showPosts);
router.get('/postById/:id',authenticateToken, showPostById);
router.get('/profile/:email',authenticateToken, showProfile);
router.get('/userPosts/:email',authenticateToken, showUserPosts);
router.get('/getSubscribers/:email', authenticateToken, showSubscribers);
router.get('/getRelatedPosts/:id', authenticateToken,getRelatedPosts);

router.put('/updateProfile/:id',authenticateToken, updateProfile);
router.put('/updatePosts',authenticateToken, updatePosts );
router.put('/subscribe', authenticateToken, subscribe );
router.put('/like',authenticateToken, like);
router.put('/putComment',authenticateToken, putComment);

router.delete('/deletePost/:id', authenticateToken, deletePost);
// (route, middleware,function) middleware is very important
export default router;