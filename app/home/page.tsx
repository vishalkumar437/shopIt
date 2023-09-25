import { Box } from "@mui/material";
import React from "react";
import Category from "../components/category/page";
import Carousel from "../components/carousel/Carousel";
import BestOf from "../components/BestOf";

export default function Landing() {
  const images = [
    {
      label: "Sale Buy Now",
      imgPath:
        "https://t3.ftcdn.net/jpg/00/74/80/30/360_F_74803077_tAM730fGIeVYoFTDLTgt8AIMXZCqh1rQ.jpg",
    },
    {
      label: "Limited Offer",
      imgPath:
        "https://t4.ftcdn.net/jpg/04/62/25/91/240_F_462259136_ieLHu3BL11q66HMrKFTtzleU8QPPmEOT.jpg",
    },
    {
      label: "Buy Now",
      imgPath:
        "https://t3.ftcdn.net/jpg/02/34/57/98/240_F_234579858_78QgXcVOI3b4DPCBuGuudFzIGygA1aWz.jpg",
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Category />
      <Carousel height={255} img={images} />
      <BestOf />
      <BestOf />
    </Box>
  );
}
