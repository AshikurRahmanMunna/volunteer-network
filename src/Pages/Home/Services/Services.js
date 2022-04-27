import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Service from "../Service/Service";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/services").then((services) => {
      setServices(services.data);
      console.log(services.data);
    });
  }, []);
  return (
    <div className="container">
      <div className="mx-auto service-card-container">
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
