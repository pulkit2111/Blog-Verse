import Navbar from "./Navbar/Navbar";
import Banner from "./Banner/Banner";
import Control from "./Blogs/Control";

const Home = () =>{
    return(
        <div>
            <Navbar isAuthor={false}/>
            <Banner />
            <Control />
            <div style={{backgroundColor:"#f5f5dc", color:"#333", textAlign:"center", padding:"2vw", margin:"2vw 0 0 0" ,boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)", opacity:"0.8"}}>
                <p>© 2024 Blog Verse. All rights reserved.</p>
                <p>Privacy Policy | Terms of Service</p>
            </div>
        </div>
    );
}

export default Home;