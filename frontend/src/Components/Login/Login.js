import React from 'react';
import './Login.css'

function Login() {
  return (
    <div className="login">
      <div className="heading"> <h1>Doc-QR</h1></div>
      <h4>LOGIN</h4>
      <form className="l-form">
        <input type="text" className='l-input' placeholder='Username'/> <br/>
        <input type="password" className='l-input' placeholder='Password'/>
        <input type="submit" className='login-btn' value="LOGIN" />
        <h6>Forgot Password? | Signup</h6>
      </form>
    </div>
  )
}

export default Login;
