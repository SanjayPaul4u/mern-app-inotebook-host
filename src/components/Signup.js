import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  // use state 📌
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });

  // use of useHistory
  const navigate = useNavigate();
  // const port = process.env.PORT || 5555
  // const host = `http://localhost:${port}`

  // handle submit 📌
  const handleSubmit = async (e) => {
    e.preventDefault();
    // api call
    const { name, email, password, c_password } = credentials;

    if (c_password === password) {
      const response = await fetch(
        `https://inotebbook.herokuapp.com/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //save the auth-token and indirect
        localStorage.setItem("token", json.authToken);
        navigate("/");
        props.showAlert("Account created successfully", "success");
      } else {
        alert("Invalid credentials");
      }
    } else {
      props.showAlert("Your both password is not same!", "danger");
    }
  };

  // onchange📌
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-5">
       <h4 style={{color: '#bbbbbb'}} className="text-center pb-3">Create account to use iNotebook</h4>
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
                Name
              </label>
              <input
                onChange={onChange}
                value={credentials.name}
                type="text"
                className="form-control"
                id="nameId"
                name="name"
                aria-describedby="emailHelp"
                minLength={3}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={onChange}
                value={credentials.email}
                type="email"
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
                type="password"
                className="form-control"
                id="passwordId"
                name="password"
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="c_password" className="form-label">
                Confirm Password
              </label>
              <input
                onChange={onChange}
                value={credentials.c_password}
                type="password"
                className="form-control"
                id="c_passwordId"
                name="c_password"
                minLength={5}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Signup
            </button>
            <br />
            <br />
            <hr />            
            <Link className="btn btn-outline-primary mx-1 btn-sm" to="/login" role="button">Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
