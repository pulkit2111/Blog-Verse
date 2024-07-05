//it controls which blogs to show based on their category

import React, { useState,useEffect } from "react";
import {API} from '../../../service/api.js';
import Post from "./Post/Post.jsx";
import { Grid } from "@mui/material";
import {useSearchParams} from 'react-router-dom';

const Control=()=>{
    const [posts,setPosts]=useState([]);
    const [searchParams] = useSearchParams();
    const category=searchParams.get('category');

    useEffect(()=>{
        const fetchData= async()=>{
            let response = await API.getAllPosts({category:category || ''});
            if(response.isSuccess)
            {
                setPosts(response.data);
            }
        }
        fetchData();
    },[category])

    return(
        <>
            {
                posts && posts.length>0 ? posts.map(post =>{
                    return (
                        <Grid item lg={4} sm={6} xs={12}>
                            <Post post={post} isAuthor={false}/>
                        </Grid>
                    )
                })
                : <div>No posts available</div>
            }
        </>
    )
}

export default Control;