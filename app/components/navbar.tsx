"use client";
import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../public/shoppit.png";
import Image from "next/image";
import searchIcon from "../../public/searchicon.png";
import Link from "next/link";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Button } from "@mui/material";
const Navbar = ({ isLoginClicked }: any) => {
  const handleLoginClick = () => {
    isLoginClicked();
  };
  return (
    <div className="Nav-MainContainer">
      <div className="Nav-logoContainer">
      <Link href="/">
        <Image src={logo} alt="ShopIT" className="Nav-logo" />
      </Link>
      <h3 className="Navbar-logotext">ShopiT</h3>
      </div>

      <div className="Navbar-SearchContainer">
        <input
          placeholder="Search For products"
          className="Navbar-searchInput"
        ></input>
        <Button id="search-button">
          <Image src={searchIcon} alt="search" className="Navbar-searchIcon" />
        </Button>
      </div>

      <div className="Nav-Container">
        <span className="Nav-Link" onClick={handleLoginClick}>
          Login
        </span>
        <Link className="Nav-Link" href="/cart">
          <ShoppingBagIcon fontSize="large" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
