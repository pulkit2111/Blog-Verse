import mongoose from "mongoose";

const notifsSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    notifs:[
        {
            link: String, 
            picture: String, 
            content: String,
            date:{type:Date, default: Date.now}
        }
    ]
});

const Notifs = mongoose.model('notifications', notifsSchema);
export default Notifs;