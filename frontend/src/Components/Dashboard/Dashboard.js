import { saveAs } from 'file-saver'
import React from 'react';
import { Navigate } from "react-router-dom";
import { useState } from 'react'
import './Dashboard.css'
import axios from 'axios';

function isAuthenticated (){
  if(localStorage.getItem("token") == null || localStorage.getItem('user_id') == null ){
    return false
  }
  return true
}

async function getUserBio  () {
  const BASE_URL = "http://localhost:8000/"
  const token = localStorage.getItem("token")
  const response = await axios.get(
    BASE_URL+"profile/",
    { 'headers': { 'Authorization': "Token "+token } }
  )
  if(response.status == 200){
    console.log(response.data['bio'])
    return response.data['bio']
  }
  else{
    return ''
  }
}


function Dashboard() {
  const [bio, setBio] = useState('')
  if(bio == ''){
    getUserBio().then((e) => setBio(e))
  }

  if(!isAuthenticated() ){
    return <Navigate to="/login" />
  }
  const generateQR = async() =>{
    const BASE_URL = "http://localhost:8000"
    const token = await localStorage.getItem("token")
    const response = await axios.post(
      BASE_URL+"/profile/",
      {"bio": bio},
      { 'headers': { 'Authorization': "Token "+token }}
    )
    if(response.status == 200){
      const response = await axios.get(
        BASE_URL+"/profile/qr/",
        { 'headers': { 'Authorization': "Token "+token } }
      )
      if(response.status == 200){
        const img_url = BASE_URL + response.data['qr']
        try{
          saveAs(img_url,"image.jpeg")
        }catch(e){
          alert("Error Occured")
        }
        
      }
    }else{
      alert("Generating QR Failed!!")
    }
    
  }
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
    return <Navigate to="/login" />
  }

  return (
    <div className="Dashboard">
      <div className="Dashboard-wrap">
        <div className="heading"> <h1>Doc-QR</h1></div>
        <h4>Dashboard</h4>
        <div className="details">
        <textarea value={bio} className='s-input' defaultValue={bio}
                placeholder='Bio' onInput={e => setBio(e.target.value)}></textarea> <br/>
        </div>
        <div className="g-btn" onClick={generateQR}>Generate QR Code</div>
        <form className="s-form">
          <h6 onClick={handleLogout}>Logout</h6>
        </form>
      </div>
    </div>
  )
}

export default Dashboard;
