import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../../logos/logo.png";
import auth from "../../firebase.init";
import axios from "axios";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [service, setService] = useState();
  const from = location?.state?.from?.pathname || '/';
  useEffect(() => {
    axios
      .get(`http://localhost:5000/service/${serviceId}`)
      .then((res) => setService(res.data));
  });
  const handleUpdateService = async (event) => {
    event.preventDefault();
    const title = event?.target?.title?.value;
    const description = event?.target?.description?.value;
    const img = event?.target?.img?.value;
    axios.put(`http://localhost:5000/service/${serviceId}`, {
      title,
      description,
      img,
    }).then(res => console.log(res.data))
    navigate(from , {replace: true});
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
          <h4 className="mb-3">Update: <span className="text-warning">{service?.title}</span></h4>
          <form onSubmit={handleUpdateService} className="register-form">
            <input type="text" name="title" placeholder="Title" required />
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
            />
            <input type="url" name="img" placeholder="PhotoURL" required />
            <input
              className="auth-submit-btn"
              type="submit"
              value="Update Service"
              required
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateService;
