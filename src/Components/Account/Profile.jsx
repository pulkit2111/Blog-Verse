import { useContext , useEffect, useState} from "react";
import Navbar from "../Home/Navbar/Navbar";
import { DataContext } from "../../context/DataProvider";
import './profile.css'
import { API } from "../../service/api";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { Button , Grid} from "@mui/material";
import Post from "../Home/Blogs/Post/Post";

const Profile=()=>{
    const account=useContext(DataContext);
    useEffect(() => {
        console.log('account: ', account);
      }, [account]);

    const [profile,setProfile]=useState([]);
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        const fetchProfile=async()=>{
            console.log('email: ',account.account.email);
            const response=await API.getProfile(account.account.email);
            if(response.isSuccess)
            {
                setProfile(response.data);
                console.log("profile: ",profile);
            }else{
                console.log('User not logged in!');
            }
        }
        fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[account.account.email]);

    useEffect(()=>{
        const fetchData= async()=>{
            let response = await API.getUserPosts(account.account.email);
            if(response.isSuccess)
            {
                setPosts(response.data);
                console.log('posts: ',posts);
            }
        }
        fetchData();
    },[account.account.email])

    return(
        <div className="profile-outer">
            <Navbar isAuthor={false}/>

            <div className="profile-box">
                <div style={{height:"10vw"}}>
                    <img className="profile-box-img" src="https://img.freepik.com/premium-photo/random-best-photo_865967-169651.jpg?w=826" alt="" />
                </div>

                <div className="profile">

                    <img  className="profilePic" src={profile.picture?profile.picture: "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"} alt="profilePicture" />

                    <div className="edit">
                        <Link to={'/updateProfile'}>
                            <Button variant="outlined" style={{textTransform:"none"}}>Edit Profile<EditIcon /></Button>
                        </Link>
                    </div>

                    <h1>{profile.name}</h1>

                    <p>{profile.about}</p>

                    <div className="subscribers">
                        <div>
                            <h1>5</h1>
                            <p>BLOGS</p>
                        </div>
                        <div>
                            <h1>218</h1>
                            <p>SUBSCRIBERS</p>
                        </div>
                    </div>

                    <div>
                        <h1 className="recentBlogs">Recent Blogs</h1>
                        <Grid container spacing={1}>
                        {
                            posts && posts.length>0 ? posts.map(post =>{
                                return(
                                <Grid item lg={4} sm={6} xs={12}>
                                    <Post post={post} />
                                </Grid>
                                )
                            })
                            : <div>No posts available</div>
                        }
                        </Grid>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile;