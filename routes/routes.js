import express from 'express';
import {signupUser, loginUser, showProfile, showUserPosts} from '../controller/user-controller.js';
import {newBlog, showPosts, showPostById} from '../controller/author-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';

const router=express.Router();

router.post('/signup',signupUser);
router.post('/login', loginUser);
router.post('/createBlog', authenticateToken,newBlog);

router.get('/getPosts', showPosts);
router.get('/postById/:id', showPostById);
router.get('/profile/:email', showProfile)
router.get('/userPosts/:email', showUserPosts)
// (route, middleware,function) middleware is very important
export default router;