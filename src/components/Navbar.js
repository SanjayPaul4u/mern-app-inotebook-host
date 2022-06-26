import React, {useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  let location = useLocation();
  useEffect(() => { 
    // console.log(location.pathname);
  }, [location])

  // logout function 📌
  const logOutFunc = ()=>{
    localStorage.removeItem('token');
    navigate('login');
  }
  
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link style={{backgroundColor:location.pathname==='/home'?'#be0032':'', borderRadius: '5px'}} className={`nav-link ${location.pathname==='/home'?'active':'' } `} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link style={{backgroundColor:location.pathname==='/about'?'#be0032':'', borderRadius: '5px'}} className={`nav-link ${location.pathname==='/about'?'active':'' } `} aria-current="page" to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
      <Link className="btn btn-primary mx-1 btn-sm" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1 btn-sm" to="/signup" role="button">Signup</Link>
      </form>:<button onClick={logOutFunc} className="btn btn-warning mx-1 btn-sm">Logout</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar