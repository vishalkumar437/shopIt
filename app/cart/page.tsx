"use client";
import { Box, Typography,Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import CardProductCart from "../components/CardProductCart/page";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState, Cart } from "../interface/interface";;
import "./Cart.css"
import Link from "next/link";
export default function Cart() {
  const [cartDetails, setCartDetails] = useState<Cart>();
  const userInfo = useSelector((state: AppState) => state.auth);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("id");
        const response = await axios.get(`http://localhost:3000/getcart`, {
          params: { userId: userId },
        });
        setCartDetails(response.data.cart);
        console.log(response.data.cart);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, []);
  if (!userInfo.isLoggedIn) {
    return <p>Login First</p>;
  }
  return (
    <div
      className="Cart-MainContainer"
    >
      <Box
        sx={{
          backgroundColor: "#ccccc0",
          width: "100%",
          maxWidth: "600px",
          padding: "16px",
          position: "relative",
        }}
      >
        {cartDetails && <CardProductCart cart={cartDetails} />}
      </Box>
      <Box
        sx={{
          backgroundColor: "lightgrey",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h5" sx={{padding:"10px"}}>Price Details</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <Typography variant="h5">Total Amount </Typography>
          <Typography variant="h6">
            {" "}
            ₹ {new Intl.NumberFormat().format(cartDetails?.amount || 0)}/-
          </Typography>
        </Box>
        <Link style={{display:"flex",justifyContent:"center",textDecoration:"none"}} href={`/checkout?id=${cartDetails?._id}`}>
          <Button variant="outlined" size="large">Checkout</Button>
        </Link>
      </Box>
    </div>
  );
}
