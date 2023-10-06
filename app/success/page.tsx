"use client";
import Lottie from "lottie-react";
import orderSuccess from "../../public/orderSuccess.json";
import { Button, Typography, Container, Box } from "@mui/material";

const OrderSuccessfulComponent = () => {
  return (
    <Container
      maxWidth="sm"
      style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }}
    >
      <Box> 
        <Lottie size={50} animationData={orderSuccess} />
      </Box>

      <Typography variant="h4" gutterBottom>
        Order Placed Successfully!
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for your purchase. Your order has been successfully placed.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Browse More
      </Button>
    </Container>
  );
};

export default OrderSuccessfulComponent;
