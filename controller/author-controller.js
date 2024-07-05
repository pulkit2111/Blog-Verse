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

export const updatePosts=async(req,res)=>{
    try {
        const email = req.body[0];
        const newName = req.body[1];
        console.log('newName: ',newName);
        console.log('user email: ',email);
        // Update the name field of all posts that match the email
        const result = await Post.updateMany(
            { email: email },
            { $set: { name: newName } }
        );

        return res.status(200).json({ msg: 'Posts updated successfully', result });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const deletePost=async(req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg:'post deleted successfully'});
    }catch(error){
        return res.status(500).json({msg: error.message});
    }
}

export default newBlog;