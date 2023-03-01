import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.scss";

const Navbarre = () => {
  return (
    <div className="navbar">
      <div className="navbar_href">
        <NavLink to="/" className="navlk">
          Home
        </NavLink>
        <NavLink to="/SignInPage" className="navlk">
          Sign-IN
        </NavLink>
        {/* <NavLink to="/SignUpPage" className="navlk">
          Sign_UP
        </NavLink> */}
        <NavLink to="/Depenses" className="navlk">
          Dépenses
        </NavLink>
        <NavLink to="/Beneficiaires" className="navlk">
          Bénéficiaires
        </NavLink>
      </div>
    </div>
  );
};

export default Navbarre;
