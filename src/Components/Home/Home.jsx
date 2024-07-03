import Navbar from "./Navbar/Navbar";
import Banner from "./Banner/Banner";
import Control from "./Blogs/Control";
import {Grid} from '@mui/material';

const Home = () =>{
    return(
        <div>
            <Navbar isAuthor={false}/>
            <Banner />
            <h1>Popular Blogs</h1>
            <Grid container spacing={2}>
                <Control />
            </Grid>
        </div>
    );
}

export default Home;