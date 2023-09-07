"use client"
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Grid, } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./Product.css";

export default function Product() {
  const products = [
    {
      name: "Moto G84",
      price: "₹28,000",
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/r/n/-original-imagmgy5jk8ytxnw.jpeg?q=70",
      rating: "4.5",

      keyspecification: [
        "108MP + 2MP | 8MP Front Camera",
        "1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories",
        "Snapdragon 888",
        "AmoLED Display",
      ],
    },
  ];

  const handleClick = ()=> {
    console.log("check");
  }


  return (
    <div className="Product-mainContainer" onClick={handleClick}>
      {products.map((product) => (
        <Box>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "#ccc",
                color: "black",
                transition: "0.5s",
              },
            }}
            className="Product-paper"
          >
            <div className="Product-content">
              <img src={product.image} alt={product.name} className="Product-image" />
              <Box  ml={2}  sx={{display:"flex",flexDirection:"column"}}>
              <Typography variant="h6">
                {product.name}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{
                  display: "flex",
                  backgroundColor: "primary.main",
                  justifyContent: "center",
                  borderRadius: 8,
                  p: 1,
                }}
              >
                {product.rating}
                <StarIcon />
              </Typography>
              </Box>
              

              <List >
                {product.keyspecification.map((spec, index) => (
                  <ListItem key={index} className="Product-specification">
                    <ListItemIcon>
                      <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText primary={spec} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6">{product.price} {"/-"}</Typography>
            </div>
          </Paper>
        </Box>
      ))}
    </div>
  );
}
