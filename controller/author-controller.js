import Post from '../schema/post.js';

export const newBlog=async(req,res) =>{
    try{
    const userBlog= await new Post(req.body);
    await userBlog.save();
    console.log('Blog added to database.');
    res.status(200).json({message: 'Blog created successfully'});
    }
    catch (error){
        console.error('Error creating blog');
    }
};

export const showPosts = async (req, res) => {
    let thisCategory = req.query.category;
    let posts;
    try {
        if(thisCategory){
            posts= await Post.find({category:thisCategory})
        } else{
            posts = await Post.find({});
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error retrieving posts', error);
        res.status(500).json({ message: 'Error retrieving posts' });
    }
};

export const showPostById=async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }catch(error){
        return res.status(500).json({msg: error.message});
    }
}

export default newBlog;