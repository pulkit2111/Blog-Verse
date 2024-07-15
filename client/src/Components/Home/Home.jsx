import Navbar from "./Navbar/Navbar";
import Banner from "./Banner/Banner";
import Control from "./Blogs/Control";
import './home.css'

const Home = () =>{
    return(
        <div>
            <Navbar isAuthor={false}/>
            <Banner />
            <Control />
            <div className="footer">
                <p>© 2024 Blog Verse. All rights reserved.</p>
                <p>Privacy Policy | Terms of Service</p>
            </div>
        </div>
    );
}

export default Home;