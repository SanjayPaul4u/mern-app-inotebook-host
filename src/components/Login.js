import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';



const Login = (props) => {
  const port = process.env.PORT || 5555
  const host = `http://localhost:${port}`
// use state 📌
const [credentials, setCredentials] = useState({email: "", password: ""});

// use of useHistory
const navigate = useNavigate();

// handle submit 📌
const handleSubmit = async (e) => {
    e.preventDefault();
    // api call
    const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        //save the auth-token and indirect
        localStorage.setItem('token', json.authToken);
        navigate('/');
        props.showAlert("Logged in successfully", "success");
    }else{
      props.showAlert("Invalid credentials", "danger");
    }
};


// onchange📌
const onChange =(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <div className="container my-5">
      <h4 style={{color: '#bbbbbb'}} className="text-center pb-3">Login to use iNotebook</h4>
      <div className="row">
        <div
          style={{
            border: "2px solid #bbbbbb",
            padding: "1rem",
            borderRadius: "5px",
          }}
          className="col-8 col-md-4 col-xxl-6 mx-auto"
        >
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
              onChange={onChange}
              value={credentials.email}
                type="text"
                className="form-control"
                id="emailId"
                name="email"
                aria-describedby="emailHelp"
              />
              <div id="email" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
              onChange={onChange}
              value={credentials.password}
                type="text"
                className="form-control"
                id="passwordId"
                name="password"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <br />
            <br />
            <hr />            
            <Link className="btn btn-outline-primary mx-1 btn-sm" to="/signup" role="button">Create account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
