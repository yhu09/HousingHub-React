import React, { Component } from "react";
import logo from "../../images/newLogo.svg";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginButton from "../auth0/LoginButton";
import LogoutButton from "../auth0/LogoutButton";

export default class Navbar extends Component {
  state = {
    isOpen: false
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Tufts Housing Hub" />
            </Link>
            <button
              type="button"
              className="nav-btn"
              onClick={this.handleToggle}
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/houses">Houses</Link>
            </li>
            <li>
              <Link to="/sublet">Sublet</Link>
            </li>
            <li>
              <Link to="/houseform">Create House</Link>
            </li>
            <li>
              <Link to="/subletform">Sublet lease</Link>
            </li>
          </ul>
          {/* <div className="nav-links">
            <li float="right">
              <LoginButton />
              <LogoutButton />
            </li>
          </div> */}
          <div className="nav-links">
            <li>
              <LoginButton />
              <LogoutButton />
            </li>
          </div>
        </div>
      </nav>
    );
  }
}
