import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const YourService = ({ service, setService }) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { img, title, _id } = service;
  const randomHex = `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;
  const handleDelete = (id) => {
    const ask = window.confirm(`Do You Really Want To Delete ${title}`);
    if (ask) {
      axios.delete(`http://localhost:5000/service/${id}`);
      axios
        .get(`http://localhost:5000/servicesByVolunteer?email=${user.email}`)
        .then((res) => setService(res.data));
    }
  };
  return (
    <div>
      <div style={{ background: randomHex }} className="service-card mt-5">
        <img className="img-fluid" src={img} alt="" />
        <h5 className="p-3">{title}</h5>
      </div>
      <div className="d-flex">
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-danger me-3 w-100"
        >
          Delete
        </button>
        <button onClick={() => navigate(`/services/update/${_id}`)} className="btn btn-warning w-100">Update</button>
      </div>
    </div>
  );
};

export default YourService;
