import express from 'express';
import {signupUser, loginUser} from '../controller/user-controller.js';
import {newBlog, showBlog} from '../controller/author-controller.js';


const router=express.Router();

router.post('/signup',signupUser);
router.post('/login', loginUser);

router.post('/createBlog', newBlog);
router.get('/getBlog', showBlog);
// (route, middleware,function)
export default router;