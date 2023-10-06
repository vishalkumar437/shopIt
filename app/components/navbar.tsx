import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../public/shoppit.png";
import Image from "next/image";
import searchIcon from "../../public/searchicon.png";
import Link from "next/link";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Badge, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, sellerLogin, userLogin } from "../action";
import { useCookies } from "next-client-cookies";
import { AppState } from "../interface/interface";
import axios from "axios";
const Navbar = ({ isLoginClicked }: any) => {
  const dispatch = useDispatch();
  const [cartQuantity,setCartQuantity] = useState(0);
  const Cookies = useCookies();
  const userInfo = useSelector((state: AppState) => state.auth);
  const handleLoginClick = () => {
    isLoginClicked();
  };
  const showLogoutAndUser = userInfo;
  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('userDetails');
    dispatch(logout()); 
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
      axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/getCart`,{
        params: { userId: userDetails.id },
      }).then((result)=>{
        setCartQuantity(result.data.cart.products.length)
      })
    }
    
  },[cartQuantity])
  

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
                <Badge badgeContent={cartQuantity} color="error"> {/* Adjust the content dynamically */}
                  <ShoppingBagIcon fontSize="large" />
                </Badge>
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
