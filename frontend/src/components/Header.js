import React from "react";
import { Link } from "react-router-dom";
import logoHeader from "../images/logo-header.svg";

function Header({ titleButtonHeader, path, onClick, userEmail }) {
  return (
    <header className="header">
      <img className="header__logo" src={logoHeader} alt="Место Россия" />
      <div className="header__navBar">
        <p className="header__navBar_userInfo">{userEmail}</p>
        <Link to={path} className="header__navBar_button" onClick={onClick}>
          {titleButtonHeader}
        </Link>
      </div>
    </header>
  );
}

export default Header;
