import './navbar.css';
import React from 'react';
import searchButton from '../Images/search.png';
import {useNavigate, useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


const Navbar=(props)=>{
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (route,query) => {
        return () => {
            if (query) {
                navigate(`${route}?category=${query}`);
            } else {
                navigate(route);
            }
        };
    }

    return (
    <div className='navBody'>

        <div className='topColor'></div>

        <div style={{paddingTop:"1vw"}}>
            <div className='website-name'>
                <button className='website-button' onClick={handleClick('/')}>Blog Verse.</button>
            </div>
            {props.isAuthor===true ?
                <div />
            :
                <div className='categories' id='categories'>
                    <ul>
                        <li><button onClick={handleClick(location.pathname, 'Travel')}>Travel</button></li>
                        <li><button onClick={handleClick(location.pathname, 'Food')}>Food</button></li>
                        <li><button onClick={handleClick(location.pathname, 'Technology')}>Technology</button></li>
                        <li><button onClick={handleClick(location.pathname, 'Lifestyle')}>Lifestyle</button></li>
                        <li><button className='author' style={{border:"1px solid lightgray"}} onClick={handleClick('/author')}>Start your Blog</button></li>
                    </ul>
                </div>   
            }
            <div className='search'>
                <button className='search-button'><img src={searchButton} alt="" /></button>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                    <React.Fragment>
                      <Button style={{color:"#304463", backgroundColor:"aliceblue", border:"none", fontWeight:"bold", textTransform:"none"}} variant="outlined" {...bindTrigger(popupState)}>
                        My Profile
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={handleClick('/profile')}>Profile</MenuItem>          
                          <MenuItem onClick={handleClick('/login')}>Logout</MenuItem>          
                      </Menu>
                    </React.Fragment>
                    )}
                </PopupState>
            </div>
        </div>
    </div>
    );
}

export default Navbar;