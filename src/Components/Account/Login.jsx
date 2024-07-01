import './login.css';

import React from "react";
import {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//images
import Google from './Images/GoogleLogo.png';
import Facebook from "./Images/fbLogo.png";
import Apple from "./Images/appleLogo.png";
import LoginBG from "./Images/login-bg.jpg";

//material ui
import Checkbox from '@mui/material/Checkbox';
import { Typography, styled } from "@mui/material";

//helper files
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";

const Error=styled(Typography)`
    font-size:10px;
    color:red;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`

const signupInitialValues={
    name: '',
    phone: '',
    email: '',
    password: ''
}

const loginInitialValues={
    email: '',
    password: ''
}

const Login=({isUserAuthenticated})=>{
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup]=useState(signupInitialValues);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(loginInitialValues);

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = ()=>{
        account==='login'?toggleAccount('signup'):toggleAccount('login');
    } 

    const onInputChange=(e)=>{
        setSignup({...signup, [e.target.name]: e.target.value}); //append new values 
    }

    const signupUser= async()=>{
        try{
        const response = await API.userSignup(signup);
        if(response.isSuccess) 
        {
            setError('');
            console.log('Succesfully registered user.')
            setSignup(signupInitialValues);
            toggleAccount('login');
        }
        else {
            setError(response.msg || 'An unexpected error occured!');
            console.log('Sign-up response error:', response.msg);
          }
        } catch (err) {
          setError(err.error || 'An unexpected error occured!');
          console.log('Sign-up catch error:', JSON.stringify(err, null, 2));
        }
    };

    const onLoginChange=(e)=>{
        setLogin({...login, [e.target.name]:e.target.value});
    }

    const loginUser = async()=>{
        try{
            const response = await API.userLogin(login);
            if(response.isSuccess) 
            {
                setError('');
                console.log('Succesfully registered user.')

                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({email: response.data.email, name:response.data.name});
                isUserAuthenticated(true);
                navigate('/');
            }
            else {
                setError(response.msg || 'An unexpected error occured!');
                console.log('Login response error:', response.msg);
              }
            } catch (err) {
              setError(err.msg || 'An unexpected error occured!');
              console.log('Error occured while logging in', JSON.stringify(err, null, 2));
            }
    }

    return(
        <div className="login-container">
        { account==='login'?
        //  login
            <div className="login-left-container" style={{padding: "0  10vw"}}>
                <div>
                    <h1>LOGO</h1>
                    <h1 style={{fontSize:"2vw"}}>Welcome Back!</h1>
                    <p>Please Enter Your Details</p>
                </div>

                <div style={{margin:"1vw 0 1vw 0"}}>
                    <button className="loginThrough" style={{float:"left"}}><img src={Google} alt="google logo" style={{width: "1.5vw", float:"left"}} /></button>
                    <button className="loginThrough"><img src={Facebook} alt="google logo" style={{width: "1.5vw", float:"left"}} /></button>
                    <button className="loginThrough" style={{float:"right"}}><img src={Apple} alt="google logo" style={{width: "1.5vw", float:"right"}} /></button>
                </div>

                <div>
                    <hr className="login-hr"/>
                    <p style={{display:"inline-block", margin:"1vw 1vw"}}>or</p>
                    <hr className="login-hr"/>
                </div>

                <div>
                    <h1 className="login-field">Email Address</h1>
                    <input type="email" className="login-input" value={login.email} onChange={(event)=>onLoginChange(event)} name="email"/>
                    <h1 className="login-field" >Password</h1>
                    <input type="text " className="login-input" value={login.password} onChange={(event)=>onLoginChange(event)} name="password"/>

                    <div style={{marginTop:"1vw"}}>
                        <Checkbox style={{float:"left"}}/>
                        <h1 style={{display:"inline-block", fontSize: "small", float:"left"}}>Remember Me</h1>
                        <h1 style={{display:"inline-block", fontSize: "small", float:"right", cursor:"pointer"}} onClick={()=>toggleSignup()}>Forgot Password?</h1>
                    </div>

                    <button className="sign-in" onClick={()=>loginUser()}>Log In</button>
                    <button className="sign-in" style={{backgroundColor:" rgb(202, 72, 72)"}} onClick={()=>toggleSignup()}>Don't Have An Account?</button>
                </div>
            </div>
        :
        // signup
            <div className="login-left-container" style={{padding: "0  10vw"}}>
                <div>
                    <h1>LOGO</h1>
                    <h1 style={{fontSize:"2vw"}}>Welcome !</h1>
                    <p>Please Enter Your Details</p>
                </div>

                <div style={{margin:"1vw 0 1vw 0"}}>
                    <button className="loginThrough" style={{float:"left"}}><img src={Google} alt="google logo" style={{width: "1.5vw", float:"left"}} /></button>
                    <button className="loginThrough"><img src={Facebook} alt="google logo" style={{width: "1.5vw", float:"left"}} /></button>
                    <button className="loginThrough" style={{float:"right"}}><img src={Apple} alt="google logo" style={{width: "1.5vw", float:"right"}} /></button>
                </div>

                <div>
                    <hr className="login-hr"/>
                    <p style={{display:"inline-block", margin:"1vw 1vw"}}>or</p>
                    <hr className="login-hr"/>
                </div>

                <div>
                    <form action="">
                    <h1 className="login-field">Name</h1>
                    <input type="text" className="login-input"  name="name" onChange={(event)=>onInputChange(event)}/>
                    <h1 className="login-field">Phone</h1>
                    <input type="number" className="login-input"  name="phone" onChange={(event)=>onInputChange(event)}/>
                    <h1 className="login-field">Email Address</h1>
                    <input type="email" className="login-input"  name="email" onChange={(event)=>onInputChange(event)}/>
                    <h1 className="login-field">Password</h1>
                    <input type="text" className="login-input" name="password" onChange={(event)=>onInputChange(event)} />
                </form>

                    <div style={{marginTop:"1vw"}}>
                        <Checkbox style={{float:"left"}}/>
                        <h1 style={{display:"inline-block", fontSize: "small", float:"left"}}>Remember Me</h1>
                    </div>
                    {error && <Error>{error}</Error>}
                    <button className="sign-in" onClick={()=>signupUser()}>Sign Up</button>

                    <button className="sign-in" style={{backgroundColor:"green"}} onClick={()=>toggleSignup()}>Already Have An Account?</button>
                </div>
            </div>
        }

        <div className="login-image-container">
            <img src={LoginBG} alt="" />
        </div>

        </div>
    );
}
export default Login;