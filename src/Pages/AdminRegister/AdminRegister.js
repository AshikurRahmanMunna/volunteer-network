import React, { useState } from "react";
import logo from "../../logos/logo.png";
import auth from "../../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const AdminRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const [user, loading, error] = useAuthState(auth);
  let errorElement;
  const handleAdminRegister = (event) => {
    event.preventDefault();
    const secretCode = process.env.REACT_APP_ADMIN_SECRET;
    console.log(secretCode);
    const secretInput = event.target.secret.value;
    if (secretCode === secretInput) {
      axios.put(`http://localhost:5000/volunteer/${user.email}`);
      toast.success("Admin Registration Successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (secretCode !== secretInput) {
      errorElement = <p className="text-danger">Wrong Secret Code</p>;
      toast.error("Wrong Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

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
          <h4 className="mb-3">Register as a Admin</h4>
          <form onSubmit={handleAdminRegister} className="register-form">
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                className="password-input"
                name="secret"
                placeholder="Admin Password"
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
              value="Register"
              required
            />
          </form>
          {errorElement}
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
