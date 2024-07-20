import { useEffect, useState} from "react";
import Navbar from "../Home/Navbar/Navbar";
import './profile.css'
import { API } from "../../service/api";
import { Button , Grid} from "@mui/material";
import Post from "../Home/Blogs/Post/Post";
import EditableField from "./EditableField";
import {Circles} from "react-loader-spinner";
import { useParams } from 'react-router-dom';
import profileBg from '../../Images/profile.png';

import firebase from "firebase/compat/app";
import 'firebase/compat/storage';

const Profile=()=>{
    console.log('hi');
    const {email, isMine}=useParams();
    console.log("userEmail: ", email);
    const [profile,setProfile]=useState([]);
    const [posts,setPosts]=useState([]);
    const [loading,setLoading] = useState(false);
    const [successMessage, setSuccessMessage]= useState("");

    useEffect(() => {
        const fetchData = async()=>
        {
            try {
                let userProfile = await API.getProfile(email);
                let userPosts = await API.getUserPosts(email);
                if (userProfile.isSuccess) {
                    setProfile(userProfile.data);
                }
                if(userPosts.isSuccess){
                    setPosts(userPosts.data);
                }
            } catch (error) {
                setSuccessMessage('Failed to show profile!');
            }
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[email])


    const handleupdate = (field, value) => {
        const updatedProfile = { ...profile, [field]: value };
        setProfile(updatedProfile);
    };

    const handleSave=async()=>{
        setLoading(true);
        await API.updateProfile(profile);
        await API.updatePosts([profile.email, profile.name]);
        setLoading(false);
        setSuccessMessage("Profile Updated Successfully.");
        setTimeout(()=>setSuccessMessage(""),3000);
    }

    const handleBGImageUpload = async(file)=>{
        await handleImageUpload(file, 'bgPicture');
    }

    const handleImageUpload= async(file, field)=>{
        console.log("field: ", field);
        if(file){
            const storageRef= firebase.storage().ref();
            const folder=field==='picture'?'Profile Pictures' : 'Cover Pictures';
            const fileRef=storageRef.child(`${folder}/${file.name}`);
            try {
                const snapshot = await fileRef.put(file);
                const downloadURL = await snapshot.ref.getDownloadURL();
                console.log(downloadURL);
                handleupdate(field, downloadURL);
            } catch (error) {
                setSuccessMessage('Error uploading file!');
                setTimeout(()=>setSuccessMessage(""),3000);
            }
        }
        else{
            console.log('no file selected!');
        }
    };

    return(
        <div className="profile-outer">
            <Navbar isAuthor={false}/>

            <div className="profile-box">
                <div className="profileBGPicContainer">
                    <img className="profileBGPic" src={profile.bgPicture?profile.bgPicture: "https://img.freepik.com/premium-photo/random-best-photo_865967-169651.jpg?w=826"} alt="profileBGPicture" />
                    {
                        isMine==='true'?(
                            <div className="bg-edit-icon">
                                <EditableField
                                value={profile.bgPicture ? profile.bgPicture : "https://img.freepik.com/premium-photo/random-best-photo_865967-169651.jpg?w=826"}
                                onSave={handleBGImageUpload}
                                type="file"
                                field="bgPicture"
                            />
                            </div>
                        ):(
                            <></>
                        )
                    }
                </div>


                <div className="profile">

                    <div className="profilePicContainer">
                        <img className="profilePic" src={profile.picture?profile.picture: profileBg} alt="profilePicture" />
                        {
                            isMine==='true'?(
                                <EditableField
                                value={profile.picture ? profile.picture : profileBg}
                                onSave={handleImageUpload}                             
                                type="file"
                                field="picture"
                                />
                            ):(
                                <></>
                            )
                        }
                    </div>

                        {
                            isMine==='true'?(
                                <div className="edit">
                                    <Button variant="outlined" style={{textTransform:"none"}} onClick={()=>handleSave()}>Update Profile</Button>
                                </div>
                            ):(
                                <></>
                            )
                        }


                    {
                        isMine==='true'?(
                            <h1 className="profile-name">
                                <EditableField value={profile.name} onSave={(value) => handleupdate('name', value)} />
                            </h1>
                        ):(
                            <h1>{profile.name}</h1>
                        )
                    }

                    <p className="profile-email">{profile.email}</p>

                    <div className="about-profile">
                        <p className="about">About: </p>
                        {
                        isMine==='true'?(
                            <p className="about-content" style={{cursor:"pointer"}}>
                                <EditableField value={profile.about} onSave={(value)=>handleupdate('about',value)} />
                            </p>
                        ):(
                            <p className="about-content">{profile.about}</p>
                        )
                        }
                    </div>
                    

                    <div className="subscribers">
                        <div>
                            <h1>{posts.length}</h1>
                            <p>BLOGS</p>
                        </div>
                        <div>
                            <h1>{ profile.subscribers && profile.subscribers.length}</h1>
                            <p>SUBSCRIBERS</p>
                        </div>
                        <div>
                            <h1>{ profile.subscriptions && profile.subscriptions.length}</h1>
                            <p>SUBSCRIPTIONS</p>
                        </div>
                    </div>

                    {loading && (
                        <div className="loader">
                            <Circles
                                ariaLabel="loading"
                                color="#00BFFF"
                                height={80}
                                width={80}
                            />
                        </div>
                     )}

                    {successMessage && (
                        <div className="successMessage">
                            {successMessage}
                        </div>
                    )}

                    <div>
                        <h1 className="recentBlogs">Recent Blogs</h1>
                        {
                            isMine==='true'?(
                                <Grid container spacing={1}>
                                {
                                    posts && posts.length>0 ? posts.map(post =>{
                                        return(
                                        <Grid item lg={4} sm={6} xs={12} key={post._id}>
                                            <Post post={post} isAuthor={true}/>
                                        </Grid>
                                        )
                                    })
                                    : <p style={{marginLeft:"3%"}}>No posts available</p>
                                }
                                </Grid>

                            ):(
                                <Grid container spacing={1}>
                                    {
                                        posts && posts.length>0 ? posts.map(post =>{
                                            return(
                                            <Grid item lg={4} sm={6} xs={12}>
                                                <Post post={post} isAuthor={false}/>
                                            </Grid>
                                            )
                                        })
                                        : <p style={{marginLeft:"3%"}}>No posts available</p>
                                    }
                                </Grid>
                            )
                        }
                    </div>

                </div>
            </div>
            <div className="footer">
                <p>© 2024 Blog Verse. All rights reserved.</p>
                <p>Privacy Policy | Terms of Service</p>
            </div>
        </div>
    )
}

export default Profile;