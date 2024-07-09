import './navbar.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Button} from '@mui/material';
import Categories from './Categories.jsx';
import Profile from './MyProfile.jsx'

const Navbar=(props)=>{
    const navigate = useNavigate();

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

        <div className='mainDiv'>
            <div className='website-name'>
                <button className='website-button' onClick={handleClick('/')}>Blog Verse.</button>
            </div>

            <div className='categories' id='categories'>
                <ul>
                    <li><Button varient="text" style={{textTransform:"none", color:"black"}} onClick={handleClick('/')}>Home</Button></li>
                    <Categories/>
                    <li><Button varient="text" style={{textTransform:"none", color:"black"}} onClick={handleClick('/author')}>Start your Blog</Button></li>
                </ul>
            </div>   

            <div className='search'>        
                <Profile/>
            </div>
            
        </div>
    </div>
    );
}

export default Navbar;