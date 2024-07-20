import './blogDetails.css';
import Navbar from '../Home/Navbar/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState, useContext} from 'react';
import {API} from '../../service/api.js';
import { Link} from 'react-router-dom';
import { Button, Grid} from '@mui/material';
import { DataContext } from '../../context/DataProvider.jsx';
import Post from '../Home/Blogs/Post/Post.jsx';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {formatDistanceToNow} from 'date-fns';
import profileBg from '../../Images/profile.png'
import { ShareButtons } from './ShareButtons.jsx';
import LoginModal from '../Modal/LoginModal.jsx';

const BlogDetail=()=>{
    const account=useContext(DataContext);
    const {id} = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({}); //this post
    const [posts,setPosts] = useState([]); //related posts

    const [successMessage, setSuccessMessage]=useState('');

    const [authorProfile,setAuthorProfile]=useState([]);
    const [userProfile, setUserProfile]=useState([]);

    const [subscribe, setSubscribe]=useState(false);
    const [like, setLike] = useState();
    const [likeCount, setLikeCount] = useState();
    const [commentOpen, setCommentOpen] = useState(false);
    const [commentCount, setCommentCount] = useState();
    const [commentsInfo, setCommentsInfo] = useState([]);
    const [comment, setComment]=useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const url= post.picture?post.picture:"https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"

    //get posts, related posts, issubscribed?, profile, like, comment
    useEffect(() => {
        const fetchData = async()=>{
            try{
                let response = await API.getPostById(id);
                let response4=await API.getRelatedPosts(id);
                if(account && account.account.email) 
                {
                    let userProfile = await API.getProfile(account.account.email);
                    if(userProfile.isSuccess){
                        setUserProfile(userProfile.data);
                    }
                }
                if(response.isSuccess)
                {
                    const fetchedPost=response.data;
                    setPost(fetchedPost);
                    setLikeCount(fetchedPost.likes.length);
                    setCommentCount(fetchedPost.comments.length);
                    const totalComments = fetchedPost.comments;
                    setCommentsInfo(totalComments);
                    const isLiked = fetchedPost.likes && fetchedPost.likes.includes(account.account.email); 
                    setLike(isLiked);
                    let response2= await API.getProfile(fetchedPost.email);
                    let response3;
                    if(account && account.account.email)
                    {
                        response3=await API.getSubscribers(fetchedPost.email);
                    }
                    if(response2.isSuccess)
                    {
                        setAuthorProfile(response2.data);
                    }
                    if(account && account.account.email && response3.isSuccess)
                    {
                        const isSubscribed = response3.data.some(subscriber => subscriber=== account.account.email);
                        if(isSubscribed) setSubscribe(true);
                        else setSubscribe(false);
                    }
                }
                if(response4.isSuccess)
                {
                    setPosts(response4.data);
                }
            }catch(error){
                setSuccessMessage('No post found!');
                setTimeout(() => setSuccessMessage(""), 3000);
            }
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    //login in case user has not logged in
    const handleLogin=()=>{
        setShowModal(false);
        navigate('/login');
    }

    const handleClose=()=>setShowModal(false);

    //subscribe
    const handleSubscriber=async()=>{
        if(userProfile.email)
        {
            try {
                let response = await API.subscribe([authorProfile.email, account.account.email]);
            
                if (response.isSuccess) {
                  setSuccessMessage(`You have successfully subscribed to ${authorProfile.name}`);
                  setSubscribe(true);
                } 
                else if(response.code===401){
                    setSuccessMessage(`You have successfully unsubscribed to ${authorProfile.name}`);
                    setSubscribe(false);
                }
                else if(response.code===420){
                    setSuccessMessage('You can not subscribe to yourself');
                }
              } catch (error) {
                setSuccessMessage('Error subscribing');
              } finally {
                setTimeout(() => setSuccessMessage(""), 3000);
              }
        }
        else{
            setShowModal(true);
        }
    }

    //like
    const handleLike= async()=>{
        if(userProfile.email)
        {
            try{
                const response = await API.like([account.account.email , id]);
                if(response.isSuccess){
                    setLike(true);
                    setLikeCount(likeCount+1);
                }else if(response.code===401){
                    setLike(false);
                    setLikeCount(likeCount-1);
                }
            }catch(error){
                setSuccessMessage('Server has not started!');
                setTimeout(() => setSuccessMessage(""), 3000);
            }
        }
        else{
            setShowModal(1);
        }
    }

    const showComments=()=>{
        setCommentOpen(!commentOpen);
    }

    //new comment
    const newComment=(e)=>{
        setComment(e.target.value);
    }

    const sendComment=async()=>{
        if(!comment) return;
        if(userProfile.email)
        {
            try{
                const response=await API.putComment([comment, userProfile.email, userProfile.name,userProfile.picture,id]);
                if(response.isSuccess){
                    const name = userProfile.name, picture=userProfile.picture, date=new Date();
                    const newcomment = {picture, name, comment, date};
                    setCommentsInfo([...commentsInfo, newcomment]);
                    setComment('');
                }   
            }catch(error){
                setSuccessMessage('Comment could not be added');
                setTimeout(() => setSuccessMessage(""), 3000);
            }
        }
        else{
            setShowModal(true);
        }
    }

    const truncateText=(text)=>{
        if(text.length<=100) return text;
        return text.slice(0,100)+'...';
    }

    const handleExpand=()=>{
        setIsExpanded(!isExpanded);
    }

    return(
        <div style={{backgroundColor: "white"}}>
            <Navbar isAuthor={false}/>
            <div className='blogdetails'>

                <div className='blog-details-box'>
                    <div className='blog'>

                        <div>
                            <Link to={'/'} style={{color:"black"}}>
                                <ArrowBackIcon />
                            </Link>
                        </div>

                        {
                            post && post.tags && post.tags.map((tag, index) => {
                                return(<p className='category' key={index}>{tag}</p>)
                            })
                        }

                        <h1>{post.title}</h1>

                        <div className='author-details'>

                            <div className='only-author-details'>
                                <div className='author-profile-pic-container'>
                                    <Link to={`/profile/${authorProfile.email}/${false}`}>
                                        <img className='author-profile-pic' src={authorProfile.picture?authorProfile.picture:"https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"} alt="profile-pic" />
                                    </Link>
                                </div>

                                <div className='blog-author-details'>
                                    <p className='by'>by {post.name}</p>
                                    <p className='blog-date'>{post.createdDate}</p>
                                </div>
                            </div>

                            <div className='subscribe-button-container'>
                                {
                                    subscribe?(
                                        <Button variant='contained' color="error" onClick={()=>{handleSubscriber()}} id='subscribe-button'>Unsubscribe</Button>
                                    ):(
                                        <Button variant='contained' color="primary" onClick={()=>{handleSubscriber()}} id='subscribe-button'>Subscribe</Button>
                                    )
                                }
                            </div>
                        </div>
                            
                        <div className='post-description'>
                            <p>{post.description}</p>
                        </div>
                            
                        <div style={{position:"relative"}}>
                            <img src={url} alt="blog" className='blog-img'/>
                            <a href={url} target="_blank" rel="noopener noreferrer" className='blog-img-icon-link'><OpenInFullIcon className='img-icon' /></a>
                        </div>
                            
                        <div className='like-section'>
                            <div className='like-comment'>
                                <div className='like'>
                                    <div onClick={handleLike}>
                                        {like? <FavoriteIcon style={{color: "red"}}/> : <FavoriteBorderIcon />}
                                    </div>
                                    <p>Like</p>
                                    <p className='like-count'>{likeCount}</p>
                                </div>

                                <div className='comment' onClick={showComments}>
                                    <div style={{margin: "auto"}}>
                                        {commentOpen? <CommentIcon style={{color:"blue"}}/> : <CommentOutlinedIcon />}
                                    </div>
                                    {commentOpen? <p  style={{color:"blue"}}>Comment</p> : <p>Comment</p>}
                                    <p className='like-count'>{commentCount}</p>
                                </div>
                            </div>

                            <div>
                                <ShareButtons url={window.location.href} title={post.title} />
                            </div>
                        </div>

                    </div>

                    {
                        commentOpen?
                        <div className='comment-box'>
                            <div className='addAComment'>
                                <div className='comment-profile-pic'>
                                    <img className='author-profile-pic' src={userProfile.picture?userProfile.picture:profileBg} alt="user-pic" />
                                </div>
                                <input type="text" placeholder='Add a comment...' value={comment} onChange={(e)=>{newComment(e)}} />
                                <SendRoundedIcon className='send-icon-comment' onClick={sendComment}/>
                            </div>
                            <div>
                            {
                                commentsInfo.map((comment, index)=>{
                                    return(
                                        <div className='prevComment-box' key={index}>
                                            <div className='old-comment-profile-pic'>
                                                <Link to={`/profile/${comment.email}/${false}`}>
                                                    <img className='author-profile-pic' src={comment.picture} alt="user-pic" />
                                                </Link>
                                            </div>
                                            <div style={{maxWidth:"80%"}}>
                                                <h1 className='old-comment-name'>{comment.name}</h1>
                                                <p className='old-comment-time'>{formatDistanceToNow(new Date(comment.date), {addSuffix: true})}</p>
                                                <p className='old-comment-data'>
                                                    {isExpanded? comment.comment : truncateText(comment.comment)}
                                                    {
                                                        comment.comment.length>100 && (
                                                            <span className='read-more-link' onClick={handleExpand}>
                                                                {isExpanded ? '  ...Read Less' : 'Read More'}
                                                            </span>
                                                        )
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                        :
                        <div />
                    }

                </div>
                
                <div className='relatedReads'>
                    <p className='relatedBlogs-para'>Related Blogs</p>
                    <Grid container spacing={3} columns={4}>
                        {
                            posts && posts.length>0 ? posts.map((post, index) =>{
                                return(
                                <Grid item lg={4} sm={6} xs={12} key={post._id}>
                                    <Post post={post} isAuthor={false}  key={post._id}/>
                                </Grid>
                                )
                            })
                            : <div></div>
                        }
                    </Grid>
                </div>
                {successMessage && (
                    <div className="successMessage">
                        {successMessage}
                    </div>
                )}

                <LoginModal show={showModal} handleClose={handleClose} handleLogin={handleLogin} />

            </div>
            <div className="details-footer">
                    <p>© 2024 Blog Verse. All rights reserved.</p>
                    <p>Privacy Policy | Terms of Service</p>
                </div>
        </div>
    );
}

export default BlogDetail;