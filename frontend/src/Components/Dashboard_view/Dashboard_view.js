import React from 'react';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import './Dashboard_view.css'
import axios from 'axios';
import { useParams } from 'react-router';


async function getUserBio  (id) {
  const BASE_URL = "http://localhost:8000/"

  const response = await axios.post(
    BASE_URL+"qr/",{"qr_token":id},
  )
  if(response.status == 200){
    return response.data['bio']
  }
  else{
    return ''
  }
}

function DashboardView() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [bio, setBio] = useState('')

  getUserBio(id).then((e) => setBio(e))

  const trymyself = () =>{
    navigate('/login')
  }

  return (
    <div className="Dashboard">
      <div className="Dashboard-wrap">
        <div className="heading"> <h1>Doc-QR</h1></div>
        <div className="details">
        <textarea value={bio} className='s-input' disabled="true"
                placeholder='Bio'></textarea> <br/>
         <form className="s-form">
          <h6 onClick={trymyself}>Try for me</h6>
        </form>
        </div>
      </div>
    </div>
  )
}

export default DashboardView;
