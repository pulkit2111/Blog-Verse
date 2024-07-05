import express from 'express';
import {signupUser, loginUser, showProfile, showUserPosts, updateProfile, subscribe, showSubscribers} from '../controller/user-controller.js';
import {newBlog, showPosts, showPostById, deletePost, updatePosts} from '../controller/author-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { getRelatedPosts } from '../controller/relatedPost-controller.js';

const router=express.Router();

router.post('/signup',signupUser);
router.post('/login', loginUser);
router.post('/createBlog', authenticateToken,newBlog);

router.get('/getPosts', authenticateToken,showPosts);
router.get('/postById/:id',authenticateToken, showPostById);
router.get('/profile/:email',authenticateToken, showProfile);
router.get('/userPosts/:email',authenticateToken, showUserPosts);
router.get('/getSubscribers/:email', authenticateToken, showSubscribers);
router.get('/getRelatedPosts/:tags', authenticateToken,getRelatedPosts);

router.put('/updateProfile/:id',authenticateToken, updateProfile);
router.put('/updatePosts',authenticateToken, updatePosts );
router.put('/subscribe', authenticateToken, subscribe );

router.delete('/deletePost/:id', authenticateToken, deletePost);
// (route, middleware,function) middleware is very important
export default router;