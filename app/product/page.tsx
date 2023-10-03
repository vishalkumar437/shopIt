"use client";
import { Button, List, Typography } from "@mui/joy";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
interface product {
  name: string;
  imageurl: [];
  description: [];
  price: string;
  seller: string;
  stock: number;
}
import "./Product.css";
import Carousel from "../components/carousel/Carousel";
import { useSelector } from "react-redux";
import { AppState } from "../interface/interface";
export default function Product() {
  const [products, setProducts] = useState<product>();
  const [loading, setLoading] = useState(true);
  const [carouselImages, setCarouselImages] = useState<
    { label: any; imgPath: any }[]
  >([]);
  const userInfo = useSelector((state: AppState) => state.auth.userInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        await axios
          .get(`${process.env.API_LINK}/product`, {
            params: { id: id },
          })
          .then((res) => {
            setProducts(res.data.product);
            res.data.product.imageurl.forEach((link: string, index: number) => {
              setCarouselImages((prevState) => {
                return [...prevState, { label: index, imgPath: link }];
              });
            });
          });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddCart = () => {
    const userid = userInfo?.id;
    const urlParams = new URLSearchParams(window.location.search);
    const pid = urlParams.get("id");
    const data = {
      userId: userid,
      productId: pid,
    };
    axios.put(`${process.env.API_LINK}/addtocart`, data).then((result) => {
      console.log(result);
    })
    .catch((error)=>{
      console.log(error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Product-mainContainer">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Carousel height={400} img={carouselImages} />
      </Box>
      <Box sx={{ margin: "10px" }}>
        <Typography sx={{ paddingBottom: "10px", fontSize: "2em" }}>
          {products?.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "blue",
              borderRadius: 8,
              p: 1,
              color: "black",
              alignItems: "center",
            }}
          >
            {/* {products.rating} */} {4.5}
            <StarIcon />
          </Box>
          <Typography sx={{ padding: "10px" }}>Rating</Typography>
        </Box>
        <Typography sx={{ paddingTop: "10px", fontSize: "2em" }}>
          {products?.price}
        </Typography>
        <Typography sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
          Specifications:
        </Typography>
        {products?.description.map((spec: string, index: number) => (
          <List key={index}>
            <Typography sx={{ paddingTop: "10px", fontSize: "1em" }}>
              {spec}
            </Typography>
          </List>
        ))}
        <Button sx={{ margin: "10px" }} onClick={handleAddCart}>
          Add To Cart
        </Button>
        <Typography sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
          Description:
        </Typography>
        {/* <List>{products.description}</List> */}
        <Typography sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
          Reviews And Comments:
        </Typography>
      </Box>
    </div>
  );
}
