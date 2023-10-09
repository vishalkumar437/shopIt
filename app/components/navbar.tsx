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
  const [cartQuantity, setCartQuantity] = useState(0);
  const [productName, setProductName] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const Cookies = useCookies();
  const userInfo = useSelector((state: AppState) => state.auth);
  const handleLoginClick = () => {
    isLoginClicked();
  };
  const showLogoutAndUser = userInfo;
  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("userDetails");
    dispatch(logout());
  };
  useEffect(() => {
    const storeCookie = Cookies.get();
    if (storeCookie.isLoggedIn) {
      const userDetails = JSON.parse(storeCookie.userDetails);
      if (userDetails.isSeller) {
        dispatch(
          sellerLogin({
            name: userDetails.name,
            id: userDetails.id,
          })
        );
      } else {
        dispatch(
          userLogin({
            name: userDetails.name,
            id: userDetails.id,
          })
        );
      }
      axios
        .get(`${process.env.NEXT_PUBLIC_API_LINK}/getCart`, {
          params: { userId: userDetails.id },
        })
        .then((result) => {
          setCartQuantity(result.data.cart.products.length);
        });
    }
  }, [cartQuantity]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LINK}/searchByName`,
        productName
      );
      setSearchResults(response.data.product);
      console.log(searchResults)
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (e: any) => {
    const input = e.target.value;
    setProductName((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if(input.length>=2){
      fetchData();
    }
    else {
      setSearchResults([]);
    }
      
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
      <div className="Autocomplete-wrapper">
          <input
            type="text"
            placeholder="Search For products"
            className="Navbar-searchInput"
            name="productName"
            onChange={handleOnChange}
          />
          {searchResults.length > 0 && (
            <div className="Suggestions">
              {searchResults.map((suggestion:any) => (
                <Link className="Suggestion" key={suggestion.id} href={`/product?id=${suggestion._id}`}>
                  {suggestion.name}
                </Link>
              ))}
            </div>
          )}
        </div>
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
              <Link
                className="Nav-Link"
                href={`/cart?id=${userInfo.userInfo?.id}`}
              >
                <Badge badgeContent={cartQuantity} color="error">
                  {" "}
                  {/* Adjust the content dynamically */}
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
