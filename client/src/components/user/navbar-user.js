import React from "react";
import { Link } from "react-router-dom";

function NavbarUser(location, handleLogout) {
  return (
    <navbar className="navbar">
      <h2 className="navbar-title">NA</h2>
      <ul className="navbar-left-items">
        <li>
          <Link to="/userpage">Form</Link>
        </li>
        <li>
          <Link to="/userpage/forms">FHIR Messages</Link>
        </li>
      </ul>
      <div className="navbar-right-items">
        <div className="user-creds">
          <h5 className="user-name">{location.state.user.UserName}</h5>
          <h5 className="user-type">{location.state.user.UserType}</h5>
        </div>
        <button type="button" onClick={handleLogout} className="btn-logout btn">
          Logout
        </button>
      </div>
    </navbar>
  );
}

export default NavbarUser;
