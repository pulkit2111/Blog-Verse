import Profile from "../schema/profile.js";
import Post from "../schema/post.js";

export const subscribe=async(req,res)=>{
    try{
        const userId=req.body[1];
        const authorId=req.body[0];

        if(userId===authorId)
        {
            return res.status(420).json({msg: 'You can not subscribe to yourself'})
        }
        const user= await Profile.findOne({email:userId});
        const author=await Profile.findOne({email : authorId});

        if (!user || !author) {
            return res.status(404).json({ msg: 'User or Author not found' });
        }
        const isPresent = author.subscribers.length && author.subscribers.includes(userId);

        if(isPresent) {

            author.subscribers = author.subscribers.filter(subscriber => subscriber !== userId);
            user.subscriptions = user.subscriptions.filter(subscription => subscription !== authorId);

            await author.save();
            await user.save();

            return res.status(401).json({ msg: 'Unsubscribed successfully' });
        }


        author.subscribers.push(userId);
        await author.save();

        user.subscriptions.push(authorId);
        await user.save();

        return res.status(200).json({ msg: 'Subscribed successfully' });
    }catch(error){
        return res.status(500).json({msg:error.message});
    }
}

export const showSubscribers=async(req,res)=>{
    try{
        const {email}=req.params;
        const user=await Profile.findOne({email});
        if(user){
            return res.status(200).json(user.subscribers);
        }
    } catch(error){
        return res.status(500).json({msg:error});
    }
}

export const like= async(req,res)=>{
    const [email, id] = req.body;
    try{
        const post = await Post.findById(id);
        const isPresent = post.likes.length && post.likes.includes(email);
        if(isPresent){
            post.likes = post.likes.filter(like => like!=email);
            await post.save();
            return res.status(401).json({msg: "Successfully Disliked"});
        }
        post.likes.push(email);
        await post.save();
        return res.status(200).json({msg: "successfully liked"});
    }catch(error){
        return res.status(500).json(error);
    }
}

export const putComment=async(req,res)=>{
    const [comment, name, picture,id]=req.body;
    try{
        const post = await Post.findById(id);
        const date=new Date();
        post.comments.push({picture, name, comment, date});
        await post.save();
        return res.status(200).json({msg: 'Successfully commented!'});
    }catch(error){
        return res.status(500).json({msg: 'Comment unsuccessful'});
    }
}