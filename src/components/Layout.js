import React, { useEffect } from "react";
import cookie from "js-cookie";
import { NavLink, Link, useHistory } from "react-router-dom";
import { isAuth, logout } from "../helpers/auth";
const Layout = ({ children }) => {
  const history = useHistory();

  const nav = () => {
    return (
      <ul className="nav nav-tabs bg-dark">
        

        {isAuth() && (
          <>
          <li className="nav-item ">
          <NavLink activeClassName="" className="nav-link text-info" to="/">
            Home
          </NavLink>
        </li>
            <li className="nav-item ">
              <NavLink
                activeClassName="secondary"
                className="nav-link text-info"
                to="/mygallery"
              >
                MyGallery
              </NavLink>
            </li>
            <li className="nav-item ml-auto">
              <NavLink
                activeClassName=""
                className="nav-link text-info"
                to="/user"
              >
                {isAuth().name}
              </NavLink>
            </li>
            <li className="nav-item ">
              <a
                className="nav-link text-info"
                onClick={() => logout(history)}
                href
              >
                Logout
              </a>
            </li>
          </>
        )}

        {!isAuth() && (
          <>
            <li className="nav-item ">
              <NavLink
                activeClassName="secondary"
                className="nav-link text-info"
                to="/login"
              >
                Login
              </NavLink>
            </li>

            <li className="nav-item ">
              <NavLink
                activeClassName=""
                className="nav-link text-info"
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    );
  };
  
  return (
    <>
      {nav()}
      <div className="container pt-5 pb-5">{children}</div>
    </>
  );
};

export default Layout;
