import './blogDetails.css';
import Navbar from '../Home/Navbar/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext} from 'react';
import {API} from '../../service/api.js';
import { Link } from 'react-router-dom';
import { Button} from '@mui/material';
import { DataContext } from '../../context/DataProvider.jsx';
// import Post from '../Home/Blogs/Post/Post.jsx';

const BlogDetail=()=>{
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [profile,setProfile]=useState([]);
    const account=useContext(DataContext);
    const [successMessage, setSuccessMessage]=useState('');
    const [subscribe, setSubscribe]=useState(false);
    // const [posts, setPosts]=useState([]);

    const url= post.picture?post.picture:"https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"

    useEffect(() => {
        const fetchData = async()=>{
            let response = await API.getPostById(id);
            if(response.isSuccess)
            {
                const fetchedPost=response.data;
                setPost(fetchedPost);
                let response2= await API.getProfile(fetchedPost.email);
                let response3=await API.getSubscribers(fetchedPost.email);
                // let response4=await API.getRelatedPosts(fetchedPost.tags);
                if(response2.isSuccess)
                {
                    setProfile(response2.data);
                }
                if(response3.isSuccess)
                {
                    const isSubscribed = response3.data.some(subscriber => subscriber=== account.account.email);
                    if(isSubscribed) setSubscribe(true);
                    else setSubscribe(false);
                }
            }else{
                console.log('no post with this id found');
            }
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    const handleSubscriber=async()=>{
        console.log('profile: ',profile);
        console.log('account: ',account);
        try {
            let response = await API.subscribe([profile.email, account.account.email]);
        
            if (response.isSuccess) {
              setSuccessMessage(`You have successfully subscribed to ${profile.name}`);
              setSubscribe(true);
            } 
          } catch (error) {
            console.error('Error subscribing:', error);
            if(error.code===401)
            {
                setSuccessMessage(`You have successfully unsubscribed to ${profile.name}`);
                setSubscribe(false);
            } else if(error.code===420){
                setSuccessMessage('You can not subscribe to yourself');
            }
            else setSuccessMessage('Error subscribing');
          } finally {
            setTimeout(() => setSuccessMessage(""), 3000);
          }
    }

    return(
        <div>
            <Navbar isAuthor={false}/>

            <div className='blog'>

                <div>
                    <ArrowBackIcon />
                    <Link to={'/'}>
                        <p className='go-back'>Go back</p>
                    </Link>
                </div>

                <p className='category'>{post.category}</p>

                <h1>{post.title}</h1>

                <div className='author-details'>
                    <div className='author-profile-pic-container'>
                        <Link to={`/details/${post._id}/profile`}>
                            <img className='author-profile-pic' src={profile.picture?profile.picture:"https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"} alt="profile-pic" />
                        </Link>
                    </div>

                    <div className='blog-author-details'>
                        <p className='by'>by {post.name}</p>
                        <p className='blog-date'>{post.createdDate}</p>
                    </div>
                </div>

                <div style={{position:"relative"}}>
                    <img src={url} alt="blog" className='blog-img'/>
                    <a href={url} target="_blank" rel="noopener noreferrer" className='blog-img-icon-link'><OpenInFullIcon className='img-icon' /></a>
                </div>

                <div>
                    <p>{post.description}</p>
                </div>

                <div>
                    {
                        subscribe?(
                            <Button variant='contained' color="error" onClick={()=>{handleSubscriber()}}>Unsubscribe</Button>
                        ):(
                            <Button variant='contained' color="primary" onClick={()=>{handleSubscriber()}}>Subscribe</Button>
                        )
                    }
                </div>
            </div>

            {/* <div>
                <h1>Related Blogs</h1>
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
            </div> */}

            {successMessage && (
                <div className="successMessage">
                    {successMessage}
                </div>
            )}
        </div>
    );
}

export default BlogDetail;