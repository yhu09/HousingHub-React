import React, { useState } from "react";
import logo from "../../images/logo2.svg";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginButton from "../auth0/LoginButton";
import LogoutButton from "../auth0/LogoutButton";
import Popup from "reactjs-popup";
import { Button } from "react-bootstrap";
import Account from "../commonHeaders/Account";
import { useAuth0 } from "@auth0/auth0-react";

// export default class Navbar extends Component {
const Navbar = () => {
  // state = {
  //   isOpen: false
  // };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth0();

  function handleToggle() {
    setIsOpen(!isOpen);
  }
  // render() {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Tufts Housing Hub" />
          </Link>
          <button type="button" className="nav-btn" onClick={handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
        </div>
        <div className="nav-link-wrapper">
          <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
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
              <Link to="/landlords">Landlord</Link>
            </li>
            <li>
              <Link to="/houseform">Create House</Link>
            </li>
            <li>
              <Link to="/subletform">Sublet Room</Link>
            </li>
            <li>
              <Link to="/landlordform">Landlord Form</Link>
            </li>
          </ul>
        </div>
        <div className="nav-log-in">
          <LoginButton style={{ margin: 20 }} text="Log in" />
          {/* <LogoutButton /> */}
          {isAuthenticated ? (
            <Popup
              trigger={<Button> Account </Button>}
              position="bottom center"
              on="hover"
            >
              <Account />
            </Popup>
          ) : null}
        </div>
      </div>
    </nav>
  );
  // }
};

export default Navbar;
