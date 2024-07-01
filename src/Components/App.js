import React from "react";
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import { useState } from "react";

//components
import Login from "./Account/Login";
import Home from "./Home/Home";
import Author from "./Author/Author.jsx";

//for global data sharing between components
import DataProvider from "../context/DataProvider";

const PrivateRoute = ({isAuthenticated, ...props}) =>{
    return isAuthenticated?
    <>
         <Outlet /> {/* outlet means child component will be executed  */}
    </>
    : <Navigate replace to='/login'/>
}

function App(){
    const [isAuthenticated, isUserAuthenticated] = useState(false);
    return (
        <div> 
            <DataProvider>
                <BrowserRouter>
                    <Routes>

                        <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
                        
                        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                            <Route path='/' element={ <Home/>} />
                        </Route>

                        <Route path="/author" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                            <Route path='/author' element={ <Author/>} />
                        </Route>   

                    </Routes>
                </BrowserRouter>
            </DataProvider>
        </div>
    );
}

export default App;
