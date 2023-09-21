import { Button, List, Typography } from "@mui/joy";
import { Box } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";

export default function page() {
  const products = {
    name: "Moto G84",
    price: "₹28,000",
    color: "Pearl Blue",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/r/n/-original-imagmgy5jk8ytxnw.jpeg?q=70",
    rating: "4.5",
    keyspecification: [
      "108MP + 2MP | 8MP Front Camera",
      "1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories",
      "Snapdragon 888",
      "AmoLED Display",
    ],
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "30vw", backgroundColor: "red" }}></Box>
      <Box sx={{ width: "100%", margin: "10px" }}>
        <Typography sx={{ paddingBottom:"10px",fontSize: "2em" }}>{products.name}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "blue",
              borderRadius: 8,
              p: 1,
              color: "black",
              alignItems:"center"
            }}
          >
            {/* {products.rating} */} {4.5}
            <StarIcon />
          </Box>
          <Typography sx={{ padding: "10px" }}>Rating</Typography>
        </Box>
        <Typography sx={{ paddingTop: "10px",fontSize:"2em" }}>{products.price}</Typography>
        <Typography sx={{fontSize:"1.5em",fontWeight:"bold"}}>Specifications:</Typography>
        {products.keyspecification.map((spec:string, index:number) => (
                  <List key={index}><Typography sx={{ paddingTop: "10px",fontSize:"1em"}}>{spec}</Typography></List>
                ))}
        <Button sx={{margin:"10px"}}>Add To Cart</Button>
        <Typography  sx={{fontSize:"1.5em",fontWeight:"bold"}}>Description:</Typography>
        <List>{products.description}</List>
        <Typography  sx={{fontSize:"1.5em",fontWeight:"bold"}}>Reviews And Comments:</Typography>
      </Box>
    </Box>
  );
}
