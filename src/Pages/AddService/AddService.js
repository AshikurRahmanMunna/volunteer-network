import React from "react";
import {
    useAuthState,
} from "react-firebase-hooks/auth";
import logo from "../../logos/logo.png";
import auth from "../../firebase.init";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddService = () => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const handleAddService = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const volunteer = user?.displayName;
    const email = event.target.email.value;
    const description = event.target.description.value;
    const date = event.target.date.value;
    const img = event.target.img.value;
    axios.post('http://localhost:5000/service', {
        title,
        volunteer,
        email,
        description,
        date,
        img
    })
    event.target.reset();
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
          <h4 className="mb-3">Add A Service</h4>
          <form onSubmit={handleAddService} className="register-form">
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="volunteer" placeholder="Volunteer" value={user?.displayName} required readOnly />
            <input type="email" name="email" placeholder="Volunteer Email" value={user?.email} required readOnly />
            <input type="text" name="description" placeholder="Description" required />
            <input type="date" name="date" required />
            <input
              type="url"
              name="img"
              placeholder="PhotoURL"
              required
            />
            <input
              className="auth-submit-btn"
              type="submit"
              value="Add Service"
              required
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
