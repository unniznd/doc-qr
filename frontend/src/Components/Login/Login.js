import {useNavigate} from 'react-router-dom'
import React from 'react';
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const handleSignup = () => {navigate('/signup')}
  
  return (
    <div className="login">
      <div className="login-wrap">
        <div className="heading"> <h1>Doc-QR</h1></div>
        <h4>LOGIN</h4>
        <form className="l-form">
          <input type="text" className='l-input' placeholder='Username'/> <br/>
          <input type="password" className='l-input' placeholder='Password'/> <br/>
          <input type="submit" className='login-btn' value="LOGIN" />
          <h6>Forgot Password? | <a onClick={handleSignup}>Signup</a></h6>
        </form>
      </div>
    </div>
  )
}

export default Login;
