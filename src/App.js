import React, {useEffect, useReducer} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login'
import SignUp from './components/signup'
import Home from "./components/home";

function App() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    // Update the document title using the browser API
    // console.log("inside")
  });

  let userDetails = localStorage.getItem("LoginDetails");

  const logout= () =>{
    localStorage.removeItem("LoginDetails")
    forceUpdate();
  }

  const reload= () =>{
    forceUpdate();
    console.log("reloaded")
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container" style={{backgroundColor:"white", padding:"20px"}}>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              {userDetails === null ? <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul> : <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" onClick={logout} to={'/sign-in'}>
                    Logout
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    {userDetails}
                  </div>
                </li>
              </ul>}
            </div>
          </div>
        </nav>
        <div>
          <div>
            <Routes>
              <Route exact path="/" element={<Login reload={reload} />} />
              <Route path="/sign-in" element={<Login reload={reload} />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App