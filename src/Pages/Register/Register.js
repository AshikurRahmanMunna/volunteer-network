import React, { useEffect, useState } from "react";
import "./Register.css";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import logo from "../../logos/logo.png";
import auth from "../../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, errorUpdating] = useUpdateProfile(auth);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  let errorElement;
  if (error) {
    console.log(error.message);
    errorElement = <p className="text-danger">{error.message}</p>;
  }
  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const password = event.target.password.value;
    const date = event.target.date.value;
    const description = event.target.description.value;
    const work = event.target.work.value;
    await createUserWithEmailAndPassword(email, password).then((result) => {
      axios.post("http://localhost:5000/volunteer", {
        name,
        email,
        phone,
        date,
        description,
        work,
      });
    });
    await updateProfile({ displayName: name });
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
          <form onSubmit={handleRegister} className="register-form">
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="tel" name="phone" placeholder="Phone" required />
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
            <input type="date" name="date" required />
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
            />
            <input type="text" name="work" placeholder="Work" required />
            <input
              className="auth-submit-btn"
              type="submit"
              value="Register"
              required
            />
          </form>
          <p>Already Have An Account? <Link to="/login" className="text-danger">Login</Link></p>
          {errorElement}
        </div>
      </div>
    </div>
  );
};

export default Register;
