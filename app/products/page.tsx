"use client"
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import "./Products.css";
import Filter from "../components/filters/Filter";
import Product from "../components/ProductCard/ProductCard";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [filteredProducts, setFilteredProducts] = useState([]); // Add filteredProducts state

  const handleFilterChange = (category: string, min: number, max: number) => {
    setSubcategory(category);
    setMinPrice(min);
    setMaxPrice(max);
    const filtered = products.filter((product:any) => {
      const meetsCategoryCriteria = !subcategory || product.subcategory === subcategory;
      const meetsPriceCriteria = product.price >= minPrice && product.price <= maxPrice;
      return meetsCategoryCriteria || meetsPriceCriteria;
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const maincategory = urlParams.get('category');
        const subcategory = urlParams.get('subcategory');
        const category = maincategory?maincategory:subcategory;
        const apiLINK = maincategory?`${process.env.NEXT_PUBLIC_API_LINK}/products`:`${process.env.NEXT_PUBLIC_API_LINK}/getProductBySubCategory`;
        console.log(apiLINK)
        const response = await axios.get(apiLINK, {
          params: { category: category }
        });
        setLoading(false);
        setProducts(response.data.product);
        const sub = await response.data.product.map((product: { subcategory: any; }) => product.subcategory);
        setSubcategories(sub);
        setFilteredProducts(response.data.product); // Initialize filteredProducts with all products
      } catch (error) {
        setLoading(true);
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="Products-container">
      <Filter onFilterChange={handleFilterChange} subCat={subcategories} />
      <div style={{ width: "100%" }}>
        {isLoading?<div style={{display:"flex",justifyContent:"center", alignItems:"center", }}><CircularProgress/></div>:<Product product={filteredProducts} />}
      </div>
    </div>
  );
}
