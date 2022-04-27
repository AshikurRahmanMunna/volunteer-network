import React, { useState } from "react";
import logo from "../../logos/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  let errorElement;
  if (error) {
    console.log(error.message);
    errorElement = <p className="text-danger">{error.message}</p>;
  }
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(email, password);
  };
  if (user) {
    navigate(from, { replace: true });
  }

  return (
    <div className="d-flex auth align-items-center justify-content-center">
      <div>
        <Link to="/">
          <img
            style={{ width: "202px", marginBottom: "30px" }}
            src={logo}
            alt="logo"
          />
        </Link>
        <div className="auth-center p-5">
          <h4 className="mb-3">Register as a volunteer</h4>
          <form onSubmit={handleLogin} className="register-form">
            <input type="email" name="email" placeholder="Email" required />
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                className="password-input"
                name="password"
                placeholder="Password"
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                ></FontAwesomeIcon>
              </span>
            </div>
            <input
              className="auth-submit-btn"
              type="submit"
              value="Login"
              required
            />
          </form>
          <p>
            Dont't Have an account?{" "}
            <Link to="/register" className="text-danger">
              Register
            </Link>
          </p>
          {errorElement}
        </div>
      </div>
    </div>
  );
};

export default Login;
