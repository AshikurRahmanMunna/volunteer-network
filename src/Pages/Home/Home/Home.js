import React from "react";
import Services from "../Services/Services";
import './Home.css';

const Home = () => {
  return (
    <div>
      <div className="banner d-flex align-items-center justify-content-center">
        <div>
          <h1 className="text-uppercase text-center">
            I grow by helping people in need
          </h1>
          <div className="input-with-btn">
              <input type="text" placeholder="Search..." />
              <button>Search</button>
          </div>
        </div>
      </div>
      <Services></Services>
    </div>
  );
};

export default Home;
