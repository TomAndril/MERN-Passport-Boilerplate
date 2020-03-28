import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/Header.css";

const Header = props => {
  const handleLogout = e => {
    e.preventDefault();
    axios
      .post("/user/logout")
      .then(res => {
        console.log(res);
        if ((res.status = 200)) {
          props.setUser({ isLogged: false, username: null });
          console.log('hola')
        }
      })
      .catch(err => {
        console.log("Error logging out");
      });
  };

  return (
    <nav className="navigation">
      <div>
        <h4 className="nav-title">
          <Link to="/">MERN APP</Link>
        </h4>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/about">About</Link>
        </li>
        {props.isLogged ? (
          <React.Fragment>
            <li>
              <Link
                to="/logout"
                onClick={e => {
                  handleLogout(e);
                }}
              >
                Logout
              </Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Header;
