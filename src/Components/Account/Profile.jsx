import { useContext , useEffect, useState} from "react";
import Navbar from "../Home/Navbar/Navbar";
import { DataContext } from "../../context/DataProvider";
import './profile.css'
import { API } from "../../service/api";
import { Button , Grid} from "@mui/material";
import Post from "../Home/Blogs/Post/Post";
import EditableField from "./EditableField";
import {Circles} from "react-loader-spinner";
import { useParams } from 'react-router-dom';

import firebase from "firebase/compat/app";
import 'firebase/compat/storage';

const Profile=({isMine})=>{
    const account=useContext(DataContext);
    const {id}=useParams();
    const [email,setEmail]=useState('');
    const [profile,setProfile]=useState([]);
    const [posts,setPosts]=useState([]);
    const [loading,setLoading] = useState(false);
    const [successMessage, setSuccessMessage]= useState("");

    useEffect(() => {
        const fetchData = async()=>{
            if (id) {
                try {
                    let response = await API.getPostById(id);
                    if (response && response.isSuccess) {
                        const fetchedPost = response.data;
                        setEmail(fetchedPost.email);
                        console.log('post: ', fetchedPost);
                    } else {
                        console.log('no post with this id found');
                    }
                } catch (error) {
                    console.error('Error fetching post: ', error);
                }
            }
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    useEffect(() => {
        console.log('account: ', account);
      }, [account]);

    useEffect(()=>{
        const fetchProfile=async()=>{
            let apiResponse;
            if (isMine) {
                apiResponse = await API.getProfile(account.account.email);
            } else {
                apiResponse = await API.getProfile(email);
            }

            if (apiResponse && apiResponse.isSuccess) {
                setProfile(apiResponse.data);
                console.log("profile: ", apiResponse.data);
            } else {
                console.log('User not logged in!');
            }
        };
        if ((isMine && account.account.email) || (!isMine && email)) {
            fetchProfile();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[account.account.email,email,isMine]);

    useEffect(() => {
        const fetchData = async () => {
            let response;
            if (isMine && account.account.email) {
                response = await API.getUserPosts(account.account.email);
            } else if (email) {
                response = await API.getUserPosts(email);
            }

            if (response && response.isSuccess) {
                setPosts(response.data);
                console.log('posts: ', posts);
            }
        };

        if ((isMine && account.account.email) || (!isMine && email)) {
            fetchData();
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account.account.email, email, isMine]);

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

    const handleImageUpload= async(event)=>{
        const selectedFile=event.target.files[0];
        if(selectedFile){
            const storageRef= firebase.storage().ref();
            const folder='Profile Pictures'
            const fileRef=storageRef.child(`${folder}/${selectedFile.name}`);
            try {
                const snapshot = await fileRef.put(selectedFile);
                const downloadURL = await snapshot.ref.getDownloadURL();
                console.log(downloadURL);
                handleupdate('picture', downloadURL);
            } catch (error) {
                console.error("Error uploading file: ", error);
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
                <div style={{height:"10vw"}}>
                    <img className="profile-box-img" src="https://img.freepik.com/premium-photo/random-best-photo_865967-169651.jpg?w=826" alt="" />
                </div>

                <div className="profile">

                    <div className="profilePicContainer">
                        <img className="profilePic" src={profile.picture?profile.picture: "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"} alt="profilePicture" />
                        {
                            isMine===true?(
                                <EditableField
                                value={profile.picture ? profile.picture : "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"}
                                onSave={handleImageUpload}
                                type="file"
                                />
                            ):(
                                <></>
                            )
                        }
                    </div>

                        {
                            isMine===true?(
                                <div className="edit">
                                <Button variant="outlined" style={{textTransform:"none"}} onClick={()=>handleSave()}>Update Profile</Button>
                            </div>
                            ):(
                                <></>
                            )
                        }


                    {
                        isMine===true?(
                            <h1>
                                <EditableField value={profile.name} onSave={(value) => handleupdate('name', value)} />
                            </h1>
                        ):(
                            <h1>{profile.name}</h1>
                        )
                    }

                    {
                        isMine===true?(
                            <p>
                                <EditableField value={profile.about} onSave={(value)=>handleupdate('about',value)} />
                            </p>
                        ):(
                            <p>{profile.about}</p>
                        )
                    }

                    <div className="subscribers">
                        <div>
                            <h1>{posts.length}</h1>
                            <p>BLOGS</p>
                        </div>
                        <div>
                            <h1>{ profile.subscribers && profile.subscribers.length}</h1>
                            <p>SUBSCRIBERS</p>
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
                            isMine===true?(
                                <Grid container spacing={1}>
                                {
                                    posts && posts.length>0 ? posts.map(post =>{
                                        return(
                                        <Grid item lg={4} sm={6} xs={12}>
                                            <Post post={post} isAuthor={true}/>
                                        </Grid>
                                        )
                                    })
                                    : <div>No posts available</div>
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
                                        : <div>No posts available</div>
                                    }
                                </Grid>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile;