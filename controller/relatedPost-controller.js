import { response } from "express";
import Post from "../schema/post.js";

export const getRelatedPosts= async(req,res)=>{    
    try{
        const currentBlog = await Post.findById(req.params.id);
        if(!currentBlog){
            return res.status(401).json({msg: 'invalid post id!'});
        }

        const relatedBlogs = await Post.find({
            _id: {$ne: currentBlog._id},
            tags: {$in: currentBlog.tags}
        });

        const blogsWithMatchingTags = relatedBlogs.map(blog => {
            const matchingTagsCount = blog.tags.filter(tag => currentBlog.tags.includes(tag)).length;
            return{
                ...blog.toObject(),
                matchingTagsCount
            }
        })
        blogsWithMatchingTags.sort((a,b)=> b.matchingTagsCount-a.matchingTagsCount);

        return res.status(200).json(blogsWithMatchingTags.slice(0,3));
    }catch(error){
        return res.status(500).json({msg:error});
    }
}