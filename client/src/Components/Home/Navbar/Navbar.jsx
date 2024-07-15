import './navbar.css';
import React , {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, IconButton, MenuItem, Menu} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import Categories from './Categories.jsx';
import Profile from './MyProfile.jsx'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { API } from '../../../service/api.js';
import {DataContext} from '../../../context/DataProvider.jsx';
import {formatDistanceToNow} from 'date-fns';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Navbar=()=>{
    const navigate = useNavigate();
    const [notifiOpen, setNotifiOpen] = useState(false);
    const account = useContext(DataContext);
    const [notifs, setNotifs] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
    
    const handleToggleCategories = (event) => {
      setAnchorEl(event.currentTarget);
      setIsCategoriesVisible(false);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setIsCategoriesVisible(false);
    };

    //fetch notifications
    useEffect(()=>{
        const fetchdata= async()=>{
            try{
                const response = await API.getNotifs(account.account.email);
                if(response.isSuccess)
                {
                    setNotifs(response.data.notifs);
                }
            }catch(error){
            }
        }
        fetchdata();
        //eslint-disable-next-line
    },[account.email])

    const handleClick = (route,query) => {
        return () => {
            if (query) {
                navigate(`${route}?category=${query}`);
            } else {
                navigate(route);
            }
        };
    }

    const toggleNotifi=()=>{
        setNotifiOpen(!notifiOpen);
    }

    const handleLink=(link)=>{
        return ()=>{
            navigate(`${link}`);
        }
    }

    const markAsRead= async()=>{
        await API.deleteNotifs(account.account.email);
        setNotifs([]);
    }

    return (
    <div className='navBody'>

        <div className='topColor'></div>

        <div className='mainDiv'>
            <div className='website-name'>
                <button className='website-button' onClick={handleClick('/')}>Blog Verse.</button>
            </div>

            <div className={`categories ${isCategoriesVisible? 'show' : ''}`} id='categories'>
                <Button varient="text" style={{textTransform:"none", color:"black"}} id='middle-button' onClick={handleClick('/')}>Home</Button>
                <Categories/>
                <Button varient="text" style={{textTransform:"none", color:"black"}} id='middle-button' onClick={handleClick('/author')}>Start your Blog</Button>
            </div>   

            <div className='hamburger'>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggleCategories}>
                  <MenuIcon />
                </IconButton>
            </div>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClick('/')}>Home</MenuItem>
                <MenuItem><Categories /></MenuItem>
                <MenuItem onClick={handleClick('/author')}>Start your Blog</MenuItem>
            </Menu>

            <div className='navbar-right'>
                <div className='notifications'>
                    <NotificationsNoneIcon onClick={toggleNotifi} />
                    {notifs.length ? <p>{notifs.length}</p> : <></>}
                </div>

                <div className='search'>        
                    <Profile/>
                </div>
            </div>

            {
                notifiOpen && (
                    <div className='notifi-box'>
                        <div className='notification-top'>
                            <h1 >Notifications</h1>
                            {notifs && notifs.length ? <p onClick={markAsRead}>Mark all as read</p> : <></>}
                        </div> 

                        <div className='notifis'>

                            {
                                notifs && notifs.length ? notifs.sort((a,b) =>new Date(b.date)-new Date(a.date)).map((notif, index)=>{
                                    return(
                                        <div className='incoming-notification' key={index}>
                                            <div className='notifi-img'>
                                                <img className='author-profile-pic' src={notif.picture} alt="user-pic" />
                                            </div>
                                            <div style={{maxWidth:"70%"}}>
                                                <p className='incoming-name'>{notif.content}</p>
                                                <p className='incoming-time'>{formatDistanceToNow(new Date(notif.date), {addSuffix:true})}</p>
                                            </div>
                                            <ArrowOutwardIcon onClick={handleLink(notif.link)} style={{cursor:"pointer"}} />
                                        </div>
                                    )
                                })
                                : 
                                <div><p>No new notification.</p></div>
                            }

                        </div>
                    </div>
                )
            }
            
        </div>
    </div>
    );
}

export default Navbar;