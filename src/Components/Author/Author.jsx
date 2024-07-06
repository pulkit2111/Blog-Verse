import { useState , useEffect, useContext} from 'react';
import Navbar from '../Home/Navbar/Navbar.jsx';
import './author.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Autocomplete, Button, TextField} from '@mui/material';
import {DataContext} from '../../context/DataProvider.jsx';
import {API} from '../../service/api.js';
import { useNavigate } from 'react-router-dom';

import Post from '../Home/Blogs/Post/Post.jsx';

import firebase from "firebase/compat/app";
import 'firebase/compat/storage';

const initialPost={
    title:'',
    description: '',
    picture: '',
    email:'',
    name:'',
    category: '',
    tags:[],
    createdDate: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

const Author=()=>{
    const [post,setPost]=useState(initialPost);
    const [tags,setTags]=useState([]);
    
    const account=useContext(DataContext);

    const navigate=useNavigate();
    
      useEffect(() => {
        console.log('Updated Post:', post); // Log to check the updated post state
        console.log('account: ', account);
      }, [post,account]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value,
            email: account && account.account.email ,
            name: account && account.account.name
        }));
    };

    const handleCategory=(event,newValue)=>{
        setPost({...post, category:newValue});
    }

    const handleTagsChange=(event,newValue)=>{
        setTags(newValue);
        setPost(prevPost=>({...prevPost,tags:newValue}));
    }

    const handleFileUpload= async(event)=>{
        const selectedFile=event.target.files[0]
        if(selectedFile){
            const storageRef= firebase.storage().ref();
            const folder='Blog Photos'
            const fileRef=storageRef.child(`${folder}/${selectedFile.name}`);
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
                navigate('/');
                console.log('Successfully created blog.');
                setPost(initialPost);
                setTags([]);
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

            <div className='author-container'>
                <form action="post" className='author-form'>
                    <h2>Create a Blog</h2>
                    <hr />
                    {post.picture && <img src={post.picture} alt="Blog" className='blog-image' />}
                    <input type="text"placeholder="Title" className='title' onChange={(e)=>handleChange(e)} name='title'/>
                    <textarea className='author-textarea' placeholder="Text..." rows={5} onChange={(e)=>handleChange(e)} name='description'/>

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

                    <Button variant='outlined' style={{position:"absolute", marginTop: "0vw", height:"7.5vh"}}>
                        <label htmlFor="fileInput">
                            Add Image 
                            <AddAPhotoIcon />
                        </label>
                    </Button>
                    <input type="file" id='fileInput' style={{display:"none"}} onChange={handleFileUpload}/>

                    </div>

                    <div>
                    <Autocomplete
                        style={{width:"84%", margin:"auto"}}
                        multiple
                        id="tags-outlined"
                        options={categories}
                        getOptionLabel={(option) => option}
                        filterSelectedOptions
                        value={tags}
                        onChange={handleTagsChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose Tags"
                          />
                        )}
                    />
                    </div>

                    <Button variant='contained' style={{margin: "2vw", height:"3.5vw"}} onClick={()=> createBlog()}>Publish</Button>

                </form>

                <div className='preview'>
                    <h1>Preview</h1>
                    <Post post={post} isAuthor={false}/>
                </div>
            </div>
    </div>
    )
}

const categories=[
    'Travel', 'Technology', 'Fashion'
];

export default Author;