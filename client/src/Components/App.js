import React from "react";
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import { useState } from "react";
import GoogleCallback from "../utils/common-utils.js";

//components
import Login from "./Account/Login";
import Home from "./Home/Home";
import Author from "./Author/Author.jsx";
import BlogDetail from "./BlogDetail/BlogDetail.jsx";
import Profile from "./Account/Profile.jsx";

//for global data sharing between components
import DataProvider from "../context/DataProvider";

const PrivateRoute = ({isAuthenticated}) =>{
    return isAuthenticated?
    <>
         <Outlet /> {/* outlet means child component will be executed  */}
    </>
    : <Navigate replace to='/login'/>
}

function App(){
    const [isAuthenticated, setAuthenticated] = useState(()=>{
        return localStorage.getItem('isAuthenticated')===true;
    });

    const isUserAuthenticated = (authState) =>{
        setAuthenticated(authState);
        localStorage.setItem('isAuthenticated', authState);
    }
    
    return (
        <div> 
            <DataProvider>
                <BrowserRouter>
                    <Routes>

                        <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
                        
                        <Route path='/' element={ <Home/>} />

                        <Route path="/author" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                            <Route path='/author' element={ <Author/>} />
                        </Route>   

                        <Route path="/details/:id" element={<BlogDetail />}/>

                        <Route path="/profile/:email/:isMine" element={<Profile />} />

                        <Route path="/profile//:isMine" element={<Login isUserAuthenticated={isUserAuthenticated} />} />

                        <Route path="/google-callback" element={<GoogleCallback isUserAuthenticated={isUserAuthenticated}/>} />

                    </Routes>
                </BrowserRouter>
            </DataProvider>
        </div>
    );
}

export default App;
