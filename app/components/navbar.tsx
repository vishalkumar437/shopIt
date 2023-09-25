// "use client";
import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../../public/shoppit.png";
import Image from "next/image";
import searchIcon from "../../public/searchicon.png";
import Link from "next/link";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, sellerLogin, userLogin } from "../action";
import { useCookies } from "next-client-cookies";
import { AppState } from "../interface/interface";
const Navbar = ({ isLoginClicked }: any) => {
  const dispatch = useDispatch();
  const Cookies = useCookies();
  const userInfo = useSelector((state: AppState) => state.auth);
  const handleLoginClick = () => {
    isLoginClicked();
  };
  const showLogoutAndUser = userInfo;
  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('userDetails');
    dispatch(logout()); // Dispatch the logout action
  };
  useEffect(()=>{
    const storeCookie = Cookies.get();
    if(storeCookie.isLoggedIn){
      const userDetails = JSON.parse(storeCookie.userDetails)
      if(userDetails.isSeller){
        dispatch(
          sellerLogin({
            name: userDetails.name,
            id: userDetails.id,
          })
        );
      }
      else{
        dispatch(
          userLogin({
            name: userDetails.name,
            id: userDetails.id,
          })
        );
      }
    }
  },[])
  

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
        {showLogoutAndUser.isLoggedIn ? (
          <>
            <span className="Nav-Link" onClick={handleLogout}>
              Logout
            </span>
            {/* Dropped down to be added here WIP */}
            {showLogoutAndUser.isSeller ? (
              <Link href="/addproduct">
                <Button variant="contained">Add Product</Button>
              </Link>
            ) : (
              <Link className="Nav-Link" href={`/cart?id=${userInfo.userInfo?.id}`}>
                <ShoppingBagIcon fontSize="large" />
              </Link>
            )}
          </>
        ) : (
          <span className="Nav-Link" onClick={handleLoginClick}>
            Login
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
