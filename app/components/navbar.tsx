import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../public/shoppit.png";
import Image from "next/image";
import searchIcon from "../../public/searchicon.png";
import Link from "next/link";

const Navbar = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
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
        <input
          placeholder="Search For products"
          className="Navbar-searchInput"
        ></input>
        <Image src={searchIcon} alt="search" className="Navbar-searchIcon" />
      </div>

      <div className="Nav-Container">
        <Link className="Nav-Link" href="/">
          Home
        </Link>
        <Link className="Nav-Link" href="/user/login">
          Login
        </Link>

        <Link className="Nav-Link" href="">
          Cart
        </Link>
      </div>
      <div className="Nav-toggle"></div>
    </div>
  );
};

export default Navbar;
