import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          </Routes>
      </div>
    </Router>
  )
}

export default App;
