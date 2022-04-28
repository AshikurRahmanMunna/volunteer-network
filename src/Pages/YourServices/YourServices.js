import { useIsSSR } from "@restart/ui/esm/ssr";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import YourService from "../YourService/YourService";

const YourServices = () => {
  const [user, loading, error] = useAuthState(auth);
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/servicesByVolunteer?email=${user.email}`)
      .then((result) => {
        console.log(result.data);
        setServices(result.data);
      });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="mx-auto service-card-container">
          {services.map((service) => (
            <YourService
              setService={setServices}
              key={service._id}
              service={service}
            ></YourService>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourServices;
