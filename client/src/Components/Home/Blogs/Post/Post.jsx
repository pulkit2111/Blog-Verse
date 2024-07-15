import './post.css';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {API} from '../../../../service/api.js';
import { useState } from 'react';

const Post=({post, isAuthor})=>{
    const url= post.picture ?  post.picture : "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"
    const [successMessage, setSuccessMessage]=useState('');

    const handleDelete=async()=>{
        let response = await API.deletePost(post._id);
        if(response.isSuccess)
        {
            setSuccessMessage('Post Deleted Successfully');
            setTimeout(()=>setSuccessMessage(''),3000);
        }
    }

    const navigate=useNavigate();
    const handleClick=(query)=>{
        return ()=>{
            navigate(`/details/${query}`);
        }
    }
    return(
        <div className="postBox">
                {successMessage && (
                    <div className="successMessage">
                        {successMessage}
                    </div>
                )}
                <div className='post-image'>
                    <img src={url} alt="blog" />
                    <a href={url} target="_blank" rel="noopener noreferrer" className='img-icon-link'><OpenInFullIcon className='img-icon' /></a>
                </div>

            <div className='post-content'>
                <div className='post-edit'>
                    <p className='post-author'>{post.name}</p>
                    {isAuthor && (
                        <div className='changePost'>
                            <DeleteIcon onClick={()=>{handleDelete()}} />
                        </div>
                        )
                    }
                    <p className='post-date'>{post.createdDate}</p>
                </div>

                <div className='post-name'>
                    <h1>{post.title}</h1>
                    <ArrowOutwardIcon className='detail-link' onClick={handleClick(post._id)}/>
                </div>

                <p>{post.description.length<=100?post.description:post.description.slice(0,100)+'...'}</p>
                <div className='tags'>
                    {post.tags && post.tags.map((tag, index) => (
                        <p key={index}>{tag}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post;