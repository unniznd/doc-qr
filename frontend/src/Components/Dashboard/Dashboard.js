import {useNavigate} from 'react-router-dom'
import React from 'react';
import './Dashboard.css'

function Dashboard() {
    const navigate = useNavigate()
    const handleLogout = ()=>{navigate('/')}

  return (
    <div className="Dashboard">
      <div className="Dashboard-wrap">
        <div className="heading"> <h1>Doc-QR</h1></div>
        <h4>Dashboard</h4>
        <div className="details"></div>
        <div className="g-btn">Generate QR Code</div>
        <form className="s-form">
          <h6 onClick={handleLogout}>Logout</h6>
        </form>
      </div>
    </div>
  )
}

export default Dashboard;
