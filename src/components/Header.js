import React from "react";
import { Link } from "react-router-dom";
import logo from './QC_logo.jpg'

const Header = ({ isAuthenticated, onLogout }) => (
  <header className="App-header">
    <img src={logo} className="logo" alt="logo" />
    <ul className="container">
      <li>
        <Link to="/">My Customers</Link>
      </li>
      {isAuthenticated ? (
        <>
          <li>
            <Link to="/new">New Customer</Link>
          </li>
          <li>
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                onLogout();
              }}
            >
              Logout
            </a>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </ul>
  </header>
);
export default Header;
