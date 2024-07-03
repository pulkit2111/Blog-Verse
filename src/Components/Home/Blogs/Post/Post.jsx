import './post.css';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';

const Post=({post})=>{
    const url= post.picture ?  post.picture : "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"
    return(
        <div className="postBox">
                <div className='post-image'>
                    <img src={url} alt="blog" />
                    <a href={url} target="_blank" rel="noopener noreferrer" className='img-icon-link'><OpenInFullIcon className='img-icon' /></a>
                </div>

            <div className='post-content'>
                <p>{post.name}</p>
                <p className='post-date'>{post.createdDate}</p>
                <div style={{position:"relative"}}>
                    <h1 style={{display:"inline-block"}}>{post.title}</h1>
                    <Link to={`details/${post._id}`}>
                        <ArrowOutwardIcon className='detail-link'/>
                    </Link>
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