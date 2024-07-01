import { useState , useEffect, useContext} from 'react';
import Navbar from '../Home/Navbar/Navbar.jsx';
import './author.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Autocomplete, Button, TextField } from '@mui/material';
import {DataContext} from '../../context/DataProvider.jsx';
import {API} from '../../service/api.js';

import firebase from "firebase/compat/app";
import 'firebase/compat/storage';

const initialPost={
    title:'',
    description: '',
    picture: '',
    email:'',
    category: '',
    createdDate: new Date()
}

const Author=()=>{
    const [post,setPost]=useState(initialPost);
    
    const account=useContext(DataContext);
    
    useEffect(() => {
        if (account?.email) {
            setPost(prevPost => ({ ...prevPost, email: account.email }));
            // console.log(account.email);
        }
    }, [account]);

    const handleChange=(e)=>{
        setPost({...post, [e.target.name]:e.target.value});
    };

    const handleCategory=(event,newValue)=>{
        setPost({...post, category:newValue});
    }

    const handleFileUpload= async(event)=>{
        const selectedFile=event.target.files[0]
        if(selectedFile){
            const storageRef= firebase.storage().ref();
            const fileRef=storageRef.child(selectedFile.name);
            try {
                const snapshot = await fileRef.put(selectedFile);
                const downloadURL = await snapshot.ref.getDownloadURL();
                console.log(downloadURL);
                setPost(prevPost => ({ ...prevPost, picture: downloadURL }));
            } catch (error) {
                console.error("Error uploading file: ", error);
            }
        }
        else{
            console.log('no file selected!');
        }
    };

    const createBlog=async()=>{
        try{
            const response = await API.blogCreate(post);
            if(response.isSuccess)
            {
                console.log('Successfully created blog.');
                setPost(initialPost);
            }
            else{
                console.log('Error creating blog.');
            }
        } catch(error){
            console.log('Error occured while creating blog', JSON.stringify(error,null,2));
        }
    }

    return(
        <div>
            <Navbar isAuthor={true}/>

            <form action="post">
                <h2>Create a Blog</h2>
                <hr />
                {post.picture && <img src={post.picture} alt="Blog" className='blog-image' />}
                <input type="text"placeholder="Title" className='title' onChange={(e)=>handleChange(e)} name='title'/>
                <textarea placeholder="Text..." rows={5} onChange={(e)=>handleChange(e)} name='description'/>

                <div className='extra'>
                <Autocomplete 
                    className='category'
                    disablePortal
                    id="combo-box-demo"
                    options={categories}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Category" />}
                    onChange={handleCategory}
                    value={post.category}
                />
                <Button variant='outlined' style={{position:"absolute", marginTop: "0vw", height:"3.5vw"}}>
                    <label htmlFor="fileInput">
                        Add Image 
                        <AddAPhotoIcon />
                    </label>
                </Button>
                <input type="file" id='fileInput' style={{display:"none"}} onChange={handleFileUpload}/>
                
                <Button variant='contained' style={{position:"absolute", marginTop: "0vw", height:"3.5vw", right:"0vw"}} onClick={()=> createBlog()}>Publish</Button>
                </div>
            </form>
        </div>
    )
}

const categories=[
    'Travel', 'Technology', 'Fashion'
];

export default Author;