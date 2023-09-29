"use client";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import CardProductCart from "../components/CardProductCart/page";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../interface/interface";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState();
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          backgroundColor: "#ccccc0",
          height: "70vh",
          width: "50vw",
        }}
      >
        {cartDetails && <CardProductCart cart={cartDetails} />}
      </Box>
      <Box
        sx={{
          backgroundColor: "lightgrey",
          height: "70vh",
          width: "30vw",
        }}
      ></Box>
    </div>
  );
}
