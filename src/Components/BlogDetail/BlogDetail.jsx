import './blogDetails.css';
import Navbar from '../Home/Navbar/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {API} from '../../service/api.js';
// import {EditIcon, DeleteIcon} from '@mui/icons-material';

const BlogDetail=()=>{
    const {id} = useParams();
    const [post, setPost] = useState({});
    const url= post.picture?post.picture:"https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"
    console.log("id: ",id);
    useEffect(() => {
        const fetchData = async()=>{
            let response = await API.getPostById(id);
            if(response.isSuccess)
            {
                setPost(response.data);
            }else{
                console.log('no post with this id found');
            }
        }
        fetchData();
    },[id])
    return(
        <div>
            <Navbar isAuthor={false}/>

            <div className='blog'>

                <div>
                    <ArrowBackIcon />
                    <p className='go-back'>Go back</p>
                </div>

                <p className='category'>{post.category}</p>

                <h1>{post.title}</h1>

                <div>
                    <p className='by'>by {post.name}</p>
                    <p>{post.createdDate}</p>
                </div>

                <div style={{position:"relative"}}>
                    <img src={url} alt="blog" className='blog-img'/>
                    <a href={url} target="_blank" rel="noopener noreferrer" className='blog-img-icon-link'><OpenInFullIcon className='img-icon' /></a>
                </div>

                <div>
                    <p>{post.description}</p>
                </div>


            </div>
        </div>
    );
}

export default BlogDetail;