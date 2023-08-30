"use client";

import { Box, List, ListItemButton, ListItemIcon } from "@mui/material";
import fashion from "../assets/clothes.png";
import gadgets from "../assets/gadgets.png";
import health from "../assets/hygiene-products.png";
import furniture from "../assets/furniture.png";
import sport from "../assets/sport.png";
import Image from "next/image";

interface category {
  title: string;
  icon: any;
  subcategory: string[];
}
export default function Category() {
  const categories = [
    { title: "Fashion", icon: fashion, subcategory: [] },
    { title: "Electronics", icon: gadgets, subcategory: [] },
    { title: "Health & Care", icon: health, subcategory: [] },
    { title: "Furniture", icon: furniture, subcategory: [] },
    { title: "Sports & Fitness", icon: sport, subcategory: [] },
  ];
  const getWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  };
  
  const getFontSize = () => {
    const width = getWidth();
    if (width <= 600) {
      return "10px";
    } else if (width <= 1024) {
      return "13px";
    } else {
      return "16px";
    }
  };
  return (
    <Box>
      <List sx={{ display: "flex", flexDirection: "row",  alignItems:"center", border: "1px solid #ccc", margin: "8px" }}>
        {categories.map((category) => (
          <ListItemButton
            key={category.title}
            sx={{
              display: "flex",
              flexDirection: "column",
              fontSize: getFontSize()
            }}
          >
            <ListItemIcon>
              <Image
                src={category.icon}
                alt={category.title}
                width={40}
                height={40}
              />
            </ListItemIcon>
            {category.title}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
