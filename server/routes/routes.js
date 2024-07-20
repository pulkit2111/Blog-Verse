import express from 'express';
import {signupUser, loginUser,googleCallback,logout, refreshToken ,showProfile, showUserPosts, updateProfile} from '../controller/user-controller.js';
import {newBlog, showPosts, showPostById, deletePost, updatePosts} from '../controller/author-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { getRelatedPosts } from '../controller/relatedPost-controller.js';
import { subscribe, showSubscribers, like , putComment} from '../controller/post-controller.js';
import {sendNotif, getNotifs, deleteNotifs} from '../controller/notification-controller.js';
import passport from '../controller/passport-controller.js';

const router=express.Router();

router.post('/signup',signupUser);
router.post('/login',passport.authenticate('local'), loginUser);
router.post('/createBlog', authenticateToken, newBlog);
router.post('/refresh-token', refreshToken);
router.post('/logout',authenticateToken, logout);
router.post('/sendNotif', sendNotif);

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback)
router.get('/getAllPosts', showPosts);
router.get('/getPostById/:id', showPostById);
router.get('/profile/:email', showProfile);
router.get('/userPosts/:email', showUserPosts);
router.get('/getSubscribers/:email', showSubscribers);
router.get('/getRelatedPosts/:id', getRelatedPosts);
router.get('/getNotifs/:email', getNotifs);

router.put('/updateProfile/:id', updateProfile);
router.put('/updatePosts', updatePosts );
router.put('/subscribe', subscribe );
router.put('/like', like);
router.put('/putComment',putComment);

router.delete('/deletePost/:id', deletePost);
router.delete('/deleteNotifs/:email', deleteNotifs);
// (route, middleware,function) middleware is very important
export default router;