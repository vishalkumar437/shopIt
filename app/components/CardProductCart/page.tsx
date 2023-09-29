"use client";
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./CartProductCard.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button from "@mui/material/Button";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Product } from "@/app/interface/interface";
export default function CardProductCart(cart: any) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProductData = async (product: any) => {
      const result = await axios.get(`http://localhost:3000/product`, {
        params: { id: product.id },
      });
      return {
        item: result.data.product,
        quantity: product.quantity,
      };
    };
    const fetchData = async () => {
      const productData = await Promise.all(
        cart.cart.products.map((product: { id: any }) =>
          fetchProductData(product)
        )
      );

      setProducts(productData);
    };

    fetchData();
  }, []);
  const handleClick = () => {
    console.log("check");
  };
  const updateQuantity = async (product:any) => {
    const updatedProducts = products.map(p => {
      if (p.item._id === product.item._id) {
        return { ...p, quantity: product.quantity };
      }
      return p;
    });
    setProducts(updatedProducts);
    const data = {
      productId:product.item._id,
      userId:cart.cart.userId,
      quantity:product.quantity
    }
    await axios.post("http://localhost:3000/updateProductQuantity",data)
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
                src={product.item.imageurl[0]}
                alt={product.item.name}
                className="CartProduct-image"
                width={75}
                height={100}
              />
              <Box sx={{ padding: "10px" }}>
                <Typography>{product.item.name}</Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  Seller: {product.item.seller.name}
                </Typography>
                <Typography>
                  {product.item.price} {"/-"}
                </Typography>
              </Box>
            </div>
            <Box sx={{ display: "flex", paddingTop: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Button
                  variant="text"
                  sx={{ borderRadius: "200px" }}
                  onClick={()=>{
                    product = {...product,quantity:product.quantity-1}
                    updateQuantity(product)
                  }}
                >
                  {" "}
                  <RemoveCircleOutlineIcon />{" "}
                </Button>
                <TextField
                  id="Quantity"
                  value={product.quantity}
                  size="small"
                  sx={{ width: "45px" }}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                ></TextField>
                <Button
                  variant="text"
                  sx={{ borderRadius: "200px" }}
                  onClick={()=>{
                    product = {...product,quantity:product.quantity+1}
                    updateQuantity(product)}
                  }
                >
                  {" "}
                  <ControlPointRoundedIcon />{" "}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      ))}
    </div>
  );
}
