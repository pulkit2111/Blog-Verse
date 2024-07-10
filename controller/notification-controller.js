import Notifs from '../schema/notifs.js';

export const sendNotif=async(req,res)=>{
    const [link, picture, content, userEmails] = req.body;
    try{
        for (const email of userEmails){
            let user = await Notifs.findOne({email});
            if(!user){
                user = new Notifs({email, notifications:[]});
            }

            user.notifs.push({link, picture, content});

            await user.save();
        }
        res.status(200).json({msg: 'Notification send successfully.'});
    }catch(error){
        res.status(500).json({msg: 'Internal server error.'});
    }
}

export const getNotifs=async(req,res)=>{
    const email=req.params.email;
    try{
        const response = await Notifs.findOne({email});
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).json(error);
    }
}

export const deleteNotifs=async(req,res)=>{
    const email = req.params.email;
    try{
        const response = await Notifs.findOneAndDelete({email});
        return res.status(200).json({msg: 'Notifications deleted successfully.'});
    }catch(error){
        return res.status(200).json({msg: 'Notification deletion unsuccessful'});
    }
}