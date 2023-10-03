"use client";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./Product.css";
import Image from "next/image";
import Link from "next/link";
interface product {
  id: any;
  imageurl: string[];
  name: string;
  description: any[];
  price:number;
  seller:string;
}
export default function Product(products: any) {
  return (
    <div className="Product-mainContainer">
      {products.product.map((product: product, index:number) => ( 
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
            className="Product-paper"
          >
            <Link className="Product-content" style={{textDecoration:"none"}}  href={`/product?id=${product.id}`}>
              
              <Image
                src={ product.imageurl[0]}
                alt={product.name}
                className="Product-image"
                width={150}
                height={200}
              />
              <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{product.name}</Typography>
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
                  {/* {product.rating} */} {4.5}
                  <StarIcon />
                </Typography>
              </Box>

              <List>
                {product.description.map((spec:string, index:number) => (
                  <ListItem key={index} className="Product-specification">
                    <ListItemIcon>
                      <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText primary={spec} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6">
                {product.price} {"/-"}
              </Typography>
            </Link>
          </Paper>
        </Box>
      ))}
    </div>
  );
}
