"use client";
import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import "./CartProductCard.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button from "@mui/material/Button";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import TextField from "@mui/material/TextField";
export default function CardProductCart() {
  const [quantity, setQuantity] = useState<number>(1);
  const products = [
    {
      name: "Moto G84 12GB RAM ",
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
      seller: "Vishal",
    },
  ];
  const handleClick = () => {
    console.log("check");
  };

  const handleDecrement = () => {
    quantity>1?setQuantity(quantity-1):removeProduct();
  };
  const removeProduct = ()=>{

  }
  const handleIncrement = () => {
    setQuantity(quantity+1);
  };

  return (
    <div className="CartProduct-mainContainer" onClick={handleClick}>
      {products.map((product: any, index: number) => (
        <Box key={index}>
          <Paper
            sx={{
              padding: 2,
              margin: 0.5,
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "#ccc",
                color: "black",
                transition: "0.5s",
              },
            }}
            className="CartProduct-paper"
          >
            <div className="CartProduct-content">
              <Image
                src={product.image}
                alt={product.name}
                className="CartProduct-image"
                width={75}
                height={100}
              />
              <Box sx={{ padding: "10px" }}>
                <Typography>{product.name}</Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  Seller: {product.seller}
                </Typography>
                <Typography>
                  {product.price} {"/-"}
                </Typography>
              </Box>
            </div>
            <Box sx={{ display: "flex", paddingTop: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Button
                  variant="text"
                  sx={{ borderRadius: "200px" }}
                  onClick={handleDecrement}
                >
                  {" "}
                  <RemoveCircleOutlineIcon />{" "}
                </Button>
                <TextField
                  id="Quantity"
                  value={quantity}
                  size="small"
                  sx={{ width: "45px" }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  
                ></TextField>
                <Button
                  variant="text"
                  sx={{ borderRadius: "200px" }}
                  onClick={handleIncrement}
                >
                  {" "}
                  <ControlPointRoundedIcon />{" "}
                </Button>
              </Box>
              <Button>Remove</Button>
            </Box>
          </Paper>
        </Box>
      ))}
    </div>
  );
}
