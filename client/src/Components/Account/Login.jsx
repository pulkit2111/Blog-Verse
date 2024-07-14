import './login.css';

import React from "react";
import {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//images
import Google from '../../Images/GoogleLogo.png';
import Facebook from "../../Images/fbLogo.png";
import Apple from "../../Images/appleLogo.png";
import LoginBG from "../../Images/login-bg.jpg";
import Logo from '../../Images/Blog verse.png'
//material ui
import Checkbox from '@mui/material/Checkbox';
import profileBg from '../../Images/profile.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

//helper files
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";

const signupInitialValues={
    name: '',
    phone: '',
    email: '',
    password: '',
    picture: profileBg
}

const loginInitialValues={
    email: '',
    password: ''
}

const Login=({isUserAuthenticated})=>{
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup]=useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [successMessage, setSuccessMessage]=useState('');

    const [showPassword, setShowPassword] = useState(false);
    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const togglePasswordVisibility=()=>{
        setShowPassword(!showPassword);
    }

    const toggleSignup = ()=>{
        account==='login'?toggleAccount('signup'):toggleAccount('login');
    } 

    const onInputChange=(e)=>{
        setSignup({...signup, [e.target.name]: e.target.value}); //append new values 
    }

    const signupUser= async()=>{
        try{
        const response = await API.userSignup(signup);
        if(response && response.isSuccess) 
        {
            console.log('Succesfully registered user.')
            setSignup(signupInitialValues);
            toggleAccount('login');
        }
        } catch (err) {
            if(err.code===400) {
                setSuccessMessage('All fields are required!');
                setTimeout(()=>(setSuccessMessage('')), 3000);
            }
            else if(err.code===409){
                setSuccessMessage('User with this email already exists!');
                setTimeout(()=>(setSuccessMessage('')), 3000);
            }
            else if(err.code === 410){
                setSuccessMessage('User with this phone already exists!');
                setTimeout(()=>(setSuccessMessage('')), 3000);
            }
            else{
                setSuccessMessage('Failed to create user!');
                setTimeout(()=>(setSuccessMessage('')), 3000);
            }
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
                
                const accessToken=response.data.accessToken;
                const refreshToken=response.data.refreshToken;
                
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                
                console.log('Succesfully logged in.')

                setAccount({email: response.data.email, name:response.data.name});
                isUserAuthenticated(true);
                navigate('/');
            }
            else{
                setSuccessMessage('Invalid email or password!');
                setTimeout(()=>(setSuccessMessage('')), 3000);
            }
            } 
        catch (err) {
            setSuccessMessage('Invalid email or password!');
            setTimeout(()=>(setSuccessMessage('')), 3000);
        }
    }

        const handleGoogle = () => {
            window.open('http://localhost:3001/google', '_self');
                };

    return(
        <div className="login-container">
        { account==='login'?
        //  login
            <div className="login-left-container" style={{padding: "0  10vw"}}>
                <div>
                    <div className='logo-container'>
                        <img src={Logo} alt="logo" className='logo'/>
                    </div>
                    <h1>Welcome Back!</h1>
                    <p className='please-enter-details'>Please Enter Your Details</p>
                </div>

                <div className='loginThrough-container'>
                    <button className="loginThrough" onClick={()=>{handleGoogle()}}><img src={Google} alt="google logo" style={{width: "1.5vw", float:"left"}} /></button>
                    <button className="loginThrough"><img src={Facebook} alt="google logo" style={{width: "1.5vw", float:"left"}} /></button>
                    <button className="loginThrough"><img src={Apple} alt="google logo" style={{width: "1.5vw", float:"right"}} /></button>
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
                    <div className='password-container'>
                        <input 
                            type={showPassword?"text" : "password"}
                            className="login-input" 
                            value={login.password} 
                            onChange={(event)=>onLoginChange(event)} 
                            name="password"
                        />
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </div>

                    <div className='remember-me'>
                        <div>
                            <Checkbox style={{float:"left"}}/>
                            <h1 style={{display:"inline-block", fontSize: "small"}}>Remember <br /> Me</h1>
                        </div>
                        <h1 style={{display:"inline-block", fontSize: "small", cursor:"pointer"}} onClick={()=>toggleSignup()}>Forgot <br /> Password?</h1>
                    </div>

                    <button className="sign-in" onClick={()=>loginUser()}>Log In</button>
                    <button className="sign-in" style={{backgroundColor:" rgb(202, 72, 72)"}} onClick={()=>toggleSignup()}>Don't Have An Account?</button>
                </div>
            </div>
        :
        // signup
            <div className="login-left-container" style={{padding: "0  10vw"}}>
                <div>
                    <div className='logo-container'>
                        <img src={Logo} alt="logo" className='logo'/>
                    </div>                    
                    <h1>Welcome !</h1>
                    <p className='please-enter-details'>Please Enter Your Details</p>
                </div>

                <div className='loginThrough-container'>
                <button className="loginThrough" style={{float:"left"}} onClick={()=>{handleGoogle()}}><img src={Google} alt="google logo" style={{width: "1.5vw", float:"left"}} /></button>
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
                    <div className='password-container'>
                        <input 
                            type={showPassword?"text" : "password"}
                            className="login-input" 
                            onChange={(event)=>onInputChange(event)} 
                            name="password"
                        />
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </div>
                </form>

                    <div className='remember-me'>
                        <Checkbox style={{float:"left"}}/>
                        <h1 style={{display:"inline-block", fontSize: "small", float:"left"}}>Remember Me</h1>
                    </div>
                    <button className="sign-in" onClick={()=>signupUser()}>Sign Up</button>

                    <button className="sign-in" style={{backgroundColor:"green"}} onClick={()=>toggleSignup()}>Already Have An Account?</button>
                </div>

            </div>
        }

        {successMessage && (
            <div className="successMessage">
                {successMessage}
            </div>
        )}
        <div className="login-image-container">
            <img src={LoginBG} alt="" />
        </div>

        </div>
    );
}
export default Login;