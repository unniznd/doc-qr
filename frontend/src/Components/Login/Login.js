import {useNavigate} from 'react-router-dom'
import React from 'react';
import { useState } from 'react'
import './Login.css'
import { Navigate } from "react-router-dom";

function isAuthenticated (){
  if(localStorage.getItem("token") == null || localStorage.getItem('user_id') == null ){
    return false
  }
  return true
}


function Login() {
  const navigate = useNavigate()
  const BASE_URL = "http://localhost:8000/"
  const axios = require('axios')
  const handleSignup = () => {navigate('/signup')}
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async ()  =>{
    if(username != '' && password != ''){
      const response = await axios.post(
        BASE_URL+"login/",
        {"username":username,"password":password}
      )
      console.log(response.data)
      localStorage.setItem("token",response.data['token'])
      localStorage.setItem("user_id",response.data['user_id'])
      navigate('/')
    }
    else{
      alert("Fill out every field!!")
    }
  }

  if(isAuthenticated() ){
    return <Navigate to="/" />
  }
  
  return (
    <div className="login">
      <div className="login-wrap">
        <div className="heading"> <h1>Doc-QR</h1></div>
        <h4>LOGIN</h4>
        <form className="l-form">
          <input type="text" value={username} className='l-input' 
                placeholder='Username' onInput={e => setUsername(e.target.value)}/> <br/>
          <input type="password" value={password} className='l-input' 
                placeholder='Password' onInput={e => setPassword(e.target.value)}/> <br/>
          <button type="button" onClick={handleLogin} className='login-btn'>LOGIN</button>
          <h6>Forgot Password? | <a onClick={handleSignup}>Signup</a></h6>
        </form>
      </div>
    </div>
  )
}

export default Login;
