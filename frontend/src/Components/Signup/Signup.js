import {useNavigate} from 'react-router-dom'
import React from 'react';
import { useState } from 'react';

import './Signup.css'

function Signup() {
  const BASE_URL = "http://localhost:8000/"
  const axios = require('axios')
  const navigate = useNavigate()
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_passwrd] = useState('')
  const [bio, setBio] = useState('')


  const handleSignUp = async ()=>{
    if(username != '' && password != '' && confirm_password != '' && bio != ''){
      if(password == confirm_password){
        try{
          const response = await axios.post(
            BASE_URL+"create/",
            { "username": username, "password":password,"bio":bio }
          )
          localStorage.setItem("token",response.data['token'])
          localStorage.setItem("user_id",response.data['user_id'])
          navigate('/')
        }
        catch(error){
          alert(error.response.data['error'])
        }
      }
  
      else{
        alert("Password field doesn't match!!")
      }
    }
    else{
      alert("Fill out every fields!!")
    }
   
  }

  const handleLogin = ()=>{
    console.log("Method called")
    navigate('/login')
    
  }

  return (
    <div className="Signup">
      <div className="Signup-wrap">
        <div className="heading"> <h1>Doc-QR</h1></div>
        <h4>SIGNUP</h4>
        <form  className="s-form">
          <input type="text" value={username} className='s-input' 
                placeholder='Username' onInput={e => setUsername(e.target.value)}/> <br/>
          {}
          <input type="password" value={password} className='s-input' 
                placeholder='Password' onInput={e => setPassword(e.target.value)}/> <br/>
          <input type="password" value={confirm_password} className='s-input' 
                placeholder='Confirm Password' onInput={e => setConfirm_passwrd(e.target.value)}/> <br/>
          <textarea value={bio} className='s-input' 
                placeholder='Bio' onInput={e => setBio(e.target.value)}></textarea> <br/>
          <button type="button" onClick={handleSignUp} className='Signup-btn' >SIGNUP</button>
          <h6 onClick={handleLogin}>Login</h6>
        </form>
      </div>
    </div>
  )
}

export default Signup;
