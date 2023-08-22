import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../public/shoppit.png";
import Image from "next/image";
import searchIcon from "../../public/searchicon.png"

interface NavbarProps {
  setActiveComponent: (componentName: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setActiveComponent }) => {
  // Notice the object destructuring here
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleNavLinkClick = (componentName: string) => {
    setActiveComponent(componentName);
    // setIsBurgerOpen(false);
    console.log("check");
  };

  return (
    <div className="Nav-MainContainer">
      <div
        className={`burger-icon ${
          isBurgerOpen ? "closed-burger" : "open-burger"
        }`}
        onClick={handleBurgerClick}
      >
        <span className="burger-bun-top"></span>
        <span className="burger-middle"></span>
        <span className="burger-bun-bottom"></span>
      </div>
      <a href="/" className="Nav-logoContainer">
        <Image src={logo} alt="ShopIT" className="Nav-logo" />
      </a>
      <h3 className="Navbar-logotext">ShopiT</h3>

      <div className="Navbar-SearchContainer">
        <input placeholder="Search For products" className="Navbar-searchInput"></input>
        <Image src={searchIcon} alt="search" className="Navbar-searchIcon"/>

      </div>

      <div className="Nav-Container">
        <div onClick={() => handleNavLinkClick("landing")} className="Nav-Link">
          Home
        </div>
        <div onClick={() => handleNavLinkClick("login")} className="Nav-link">
          Login
        </div>
        <div onClick={() => handleNavLinkClick("cart")} className="Nav-Link">
          Cart
        </div>
      </div>
      <div className="Nav-toggle"></div>
    </div>
  );
};

export default Navbar;
