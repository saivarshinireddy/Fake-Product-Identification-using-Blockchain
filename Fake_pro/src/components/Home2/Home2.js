import React from "react";
import { Link } from "react-router-dom";
import "./Home2.css"; 

function Home2({ user, setUser, setUserName }) {
  return (
    <div className="home-container">
      <h1 className="home-title">Fake Product Identification using Blockchain</h1>
      <div className="home-links">
        <div className="user-option">
          <img src="https://www.asme.org/getmedia/b49bbec7-888c-4d4e-a64d-2d8eae5bee4f/Blog-Hero-Manufacturing.jpg?width=920&height=720&ext=.jpg" alt="Manufacturer" className="user-image" />
          <img src="https://images.2moons.ai/prompt/slices/4/watermarked/customer_cartoon_icon_uZNLO.png" alt="Customer" className="user-image" />
          
        </div>
        <div className="user-option">
        <h2>
            <Link to={{ pathname: "/login", state: { user: "" } }} className="home-link" onClick={() => setUser("manufacturer")}>Manufacturer</Link>
          </h2>
          <h2>
            <Link to={{ pathname: "/", state: { user: "customer" } }} className="home-link" onClick={() => {setUser("customer"); setUserName('eligible')}}>Customer</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Home2;
