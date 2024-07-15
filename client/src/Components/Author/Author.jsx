import { useState , useEffect} from 'react';
import Navbar from '../Home/Navbar/Navbar.jsx';
import './author.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Autocomplete, Button, TextField} from '@mui/material';
import {API} from '../../service/api.js';
import { useNavigate } from 'react-router-dom';

import Post from '../Home/Blogs/Post/Post.jsx';

import firebase from "firebase/compat/app";
import 'firebase/compat/storage';

const initialPost={
    title:'',
    description: '',
    picture: 'https://i.pinimg.com/564x/5f/87/01/5f87010e0785926f488c70ec4b0836a6.jpg',
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
    const [profile, setProfile] = useState([]);
    
    const account=JSON.parse(localStorage.getItem('account'));

    const navigate=useNavigate();
    
    useEffect(() => {
      const fetchData=async()=>{
          try{
              let userProfile = await API.getProfile(account.email);
              if(userProfile.isSuccess)
              {
                  setProfile(userProfile.data);
              }
          }catch(error){
              console.log('error fetching profile', error);
          }
      }
      fetchData();
    }, [account.email]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value,
            email: account.email ,
            name: account.name
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
                const response2 = await API.sendNotif([`/details/${response.data._id}`, profile.picture, `'${account.name}' has created a new blog '${post.title}'.` , profile.subscribers]);
                if(response2.isSuccess)
                {
                    navigate('/');
                    console.log('Successfully created blog and sent notifications.');
                    setPost(initialPost);
                    setTags([]);   
                }
            }
        } catch(error){
            console.log('Error occured while creating blog', JSON.stringify(error,null,2));
        }
    }

    
    const categories=[
        'Travel', 'Technology', 'Fashion', 'Food', 'Cars', 'Nature'
    ];

    const tagss=[
        '#new', '#innovative', '#business', '#saveEarth','#style'
    ];

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
                            disablePortal
                            id="combo-box-demo"
                            options={categories}
                            value={categories.includes(post.category) ? post.category : null}                        sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                            onChange={handleCategory}
                            isOptionEqualToValue={(option,value)=>option===value}
                        />

                        <Button variant='outlined' style={{margin:"auto"}} id='add-image-button'>
                            <label htmlFor="fileInput" id='add-image-label'>
                                Add Image 
                                <AddAPhotoIcon id='add-a-photo-icon'/>
                            </label>
                        </Button>
                        <input type="file" id='fileInput' style={{display:"none"}} onChange={handleFileUpload}/>

                    </div>

                    <div className='choose-tags'>
                        <Autocomplete
                            style={{width:"84%", margin:"auto"}}
                            multiple
                            id="tags-outlined"
                            options={tagss}
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

                    <Button variant='contained' className='publish-button' onClick={()=> createBlog()}>Publish</Button>

                </form>

                <div className='preview'>
                    <h1>Preview</h1>
                    <Post post={post} isAuthor={false}/>
                </div>
            </div>

            <div className="footer">
                <p>© 2024 Blog Verse. All rights reserved.</p>
                <p>Privacy Policy | Terms of Service</p>
            </div>
    </div>
    )
}

export default Author;