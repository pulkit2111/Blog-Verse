//it controls which blogs to show based on their category

import React, { useState,useEffect } from "react";
import {API} from '../../../service/api.js';
import Post from "./Post/Post.jsx";
import { Grid } from "@mui/material";
import {useSearchParams} from 'react-router-dom';
import Search from '../Banner/Search.jsx';

const Control=()=>{
    const [posts,setPosts]=useState([]);
    const [searchParams] = useSearchParams();
    const [successMessage, setSuccessMessage]= useState("");
    const category=searchParams.get('category');

    useEffect(()=>{
        const fetchData= async()=>{
            try{
                let response = await API.getAllPosts({category:category || ''});
                if(response.isSuccess)
                {
                    setPosts(response.data);
                }
            }catch(error){
                setSuccessMessage('Server has not started yet!');
            }
        }
        fetchData();
    },[category])

    return(
        <>
            <div className="search-posts">
                <Search posts={posts} category={category}/>
            </div>
            <Grid container spacing={2}>
                {
                    posts && posts.length>0 ? posts.map(post =>{
                        return (
                            <Grid item lg={4} sm={6} xs={12} key={post._id}>
                                <Post post={post} isAuthor={false}/>
                            </Grid>
                        )
                    })
                    : <div>No posts available</div>
                }
                {successMessage && (
                    <div className="successMessage">
                        {successMessage}
                    </div>
                )}
            </Grid>
        </>
    )
}

export default Control;