export const getRelatedPosts=(req,res)=>{
    const {tags}=req.params;
    console.log('tags: ',tags);
    try{
        
    }catch(error){
        return res.status(500).json({msg:error});
    }
}