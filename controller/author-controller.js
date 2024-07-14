import mongoose from 'mongoose';
import Post from '../schema/post.js';


export const newBlog=async(req,res) =>{
    const blog=req.body;
    try{
    const userBlog=new Post(blog);
    await userBlog.save();
    console.log('Blog added to database.');
    res.status(201).json({message: 'Blog created successfully'});
    }
    catch (error){
        console.error('Error creating blog');
    }
};

export const showBlog = async (req, res) => {
    try {
        const recentBlog = await Post.findOne().sort({ createdAt: -1 });
        if (recentBlog) {
            res.status(200).json(recentBlog);
        } else {
            res.status(404).json({ message: 'No blog found' });
        }
    } catch (error) {
        console.error('Error retrieving blog', error);
        res.status(500).json({ message: 'Error retrieving blog' });
    }
};

export default newBlog;