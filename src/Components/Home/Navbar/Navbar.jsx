import './navbar.css';
import Profile from './Profile-navbar.jsx';
import searchButton from '../Images/search.png';
import {useNavigate} from 'react-router-dom';

const Navbar=(props)=>{
    const navigate = useNavigate();

    const handleClick = (route) => {
        return () => {
            navigate(route);
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
                        <li><button>Travel</button></li>
                        <li><button>Food</button></li>
                        <li><button>Technology</button></li>
                        <li><button>Lifestyle</button></li>
                        <li><button className='author' style={{border:"1px solid lightgray"}} onClick={handleClick('/author')}>Start your Blog</button></li>
                    </ul>
                </div>   
            }
            <div className='search'>
                <button className='search-button'><img src={searchButton} alt="" /></button>
                <Profile />
            </div>
        </div>
    </div>
    );
}

export default Navbar;