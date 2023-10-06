"use client";
import React, { useState } from "react";
import CheckoutCards from "../components/CheckoutCards/page";
import CircularProgress from "@mui/material/CircularProgress";
import DeliveryForm from "../components/DeliveryAddress/page";
import CardPaymentDetails from "../components/CardPaymentDetails/page";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../interface/interface";
import { loadStripe } from "@stripe/stripe-js";
const Checkout = () => {
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: AppState) => state.auth.userInfo?.id);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const urlParams = new URLSearchParams(window.location.search);
  const cartId = urlParams.get("id");
  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      address: { ...address, userId: userId },
      paymentMethod: paymentMethod,
      cartId: cartId,
    };
    if (paymentMethod === "COD") {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_LINK}/newOrder`,
          data
        );
        if (response.status === 200) {
          // Display success message and redirect
          alert("Order successful!");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error making payment:", error);
        alert("Error making payment. Please try again.");
      } finally {
        setLoading(false); // Set loading state back to false after request completes
      }
    } else {
      const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`)
      const stripeResponse = await axios
        .post(`${process.env.NEXT_PUBLIC_API_LINK}/stripe/create-checkout-session`, data)
        .then((response: { data: { sessionId: string } }) => {
            stripe?.redirectToCheckout({
              sessionId:response.data.sessionId
            })
        })
        .catch((err: { message: any }) => console.log(err.message));
    }
  };
  return (
    <div style={{ padding: "10px", margin: "10px" }}>
      <CheckoutCards cardType="Address">
        <DeliveryForm set={setAddress} />
      </CheckoutCards>
      <CheckoutCards cardType="Payment">
        <CardPaymentDetails
          set={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
      </CheckoutCards>
      <Box sx={{ textAlign: "center" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={handleSubmit}
          >
            Make Payment
          </Button>
        )}
      </Box>
    </div>
  );
};
export default Checkout;
