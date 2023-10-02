"use client";
import React, { useState } from "react";
import CheckoutCards from "../components/CheckoutCards/page";
import DeliveryForm from "../components/DeliveryAddress/page";
import CardPaymentDetails from "../components/CardPaymentDetails/page";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../interface/interface";
export default function Checkout() {
  const [address,setAddress] = useState({});
  const userId = useSelector((state:AppState)=>state.auth.userInfo?.id);
  const [paymentMethod,setPaymentMethod] = useState('COD'); 
  const urlParams = new URLSearchParams(window.location.search);
  const cartId = urlParams.get("id");
  const handleSubmit = async ()=>{
    const data = {
      address:{...address,userId:userId},
      paymentMethod:paymentMethod,
      cartId:cartId
    }
    if(paymentMethod==='COD'){
      const response = await axios.post("http://localhost:3000/newOrder",data);
    }
  }
  return (
    <div style={{ padding: "10px", margin: "10px" }}>
      <CheckoutCards cardType="Address">
        <DeliveryForm set={setAddress}/>
      </CheckoutCards>
      <CheckoutCards cardType="Payment">
        <CardPaymentDetails set={setPaymentMethod} paymentMethod={paymentMethod}/>
      </CheckoutCards>
      <Box sx={{textAlign:"center"}}>
        <Button variant="contained" color="primary" size="large" type="submit" onClick={handleSubmit}>     
          Make Payment
        </Button>
      </Box>
    </div>
  );
}
