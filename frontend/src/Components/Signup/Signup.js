import {useNavigate} from 'react-router-dom'
import React from 'react';
import './Signup.css'

function Signup() {
    const navigate = useNavigate()
    const handleLogin = ()=>{navigate('/')}

  return (
    <div className="Signup">
      <div className="Signup-wrap">
        <div className="heading"> <h1>Doc-QR</h1></div>
        <h4>SIGNUP</h4>
        <form className="s-form">
          <input type="text" className='s-input' placeholder='Username'/> <br/>
          <input type="password" className='s-input' placeholder='Password'/> <br/>
          <input type="password" className='s-input' placeholder='Confirm Password'/> <br/>
          <input type="text" className='s-input' placeholder='Bio'/> <br/>
          <input type="submit" className='Signup-btn' value="SIGNUP" />
          <h6 onClick={handleLogin}>Login</h6>
        </form>
      </div>
    </div>
  )
}

export default Signup;
