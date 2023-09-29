import React from "react";
import CheckoutCards from "../components/CheckoutCards/page";
import DeliveryForm from "../components/DeliveryAddress/page";
import CardPaymentDetails from "../components/CardPaymentDetails/page";
import { Box, Button } from "@mui/material";
export default function Checkout() {
  return (
    <div style={{ padding: "10px", margin: "10px" }}>
      <CheckoutCards>
        <DeliveryForm />
      </CheckoutCards>
      <CheckoutCards>
        <CardPaymentDetails />
      </CheckoutCards>
      <Box sx={{textAlign:"center"}}>
        <Button variant="contained" color="primary" size="large" type="submit">     
          Make Payment
        </Button>
      </Box>
    </div>
  );
}
