import React from "react";

import Navbar from "./Navbar/Navbar";
import Banner from "./Banner/Banner";
import Popular from "./Popular/Popular";

const Home = () =>{
    return(
        <div>
            <Navbar isAuthor={false}/>
            <Banner />
            <Popular />
        </div>
    );
}

export default Home;