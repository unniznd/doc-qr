import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Dashboard from './Components/Dashboard/Dashboard'
import DashboardView from './Components/Dashboard_view/Dashboard_view'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/' element={<Dashboard/>} />
          <Route path='/qr/:id' element={<DashboardView/>} />
          </Routes>
      </div>
    </Router>
  )
}

export default App;
