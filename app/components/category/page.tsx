"use client";

import { Box, List, ListItemButton, ListItemIcon } from "@mui/material";
import fashion from "../assets/clothes.png";
import gadgets from "../assets/gadgets.png";
import health from "../assets/hygiene-products.png";
import furniture from "../assets/furniture.png";
import sport from "../assets/sport.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface category {
  title: string;
  icon: any;
  subcategory: string[];
}
export default function Category() {
  const categories = [
    { title: "Fashion", icon: fashion,category:"fashion", subcategory: [] },
    { title: "Electronics", icon: gadgets,category:"electronics", subcategory: [] },
    { title: "Health & Care", icon: health,category:"healthandcare", subcategory: [] },
    { title: "Furniture", icon: furniture,category:"furniture", subcategory: [] },
    { title: "Sports & Fitness", icon: sport, category:"sports",subcategory: [] },
  ];
  const [fontSize, setFontSize] = useState("");

  useEffect(() => {
    // Check the window width and set the fontSize accordingly
    const width = window.innerWidth;
    if (width <= 600) {
      setFontSize("10px");
    } else if (width <= 1024) {
      setFontSize("13px");
    } else {
      setFontSize("16px");
    }
  }, []);

  return (
    <Box>
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          border: "1px solid #ccc",
          margin: "8px",
        }}
      >
        {categories.map((category) => (
          <ListItemButton
            key={category.title}
            sx={{
              display: "flex",
              flexDirection: "column",
              fontSize: fontSize,
            }}
          >
            <Link href={`/products?category=${category.category}`} style={{display:"flex",flexDirection:"column", textDecoration:"none", alignItems:"center"}}>
            <ListItemIcon>
              <Image
                src={category.icon}
                alt={category.title}
                width={40}
                height={40}
              />
            </ListItemIcon>
            {category.title}</Link>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
