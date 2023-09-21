"use client"
import React, { useState, useEffect } from "react";
import "./Products.css";
import Filter from "../components/filters/Filter";
import Product from "../components/ProductCard/ProductCard";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        const response = await axios.get(`http://localhost:3000/products`, {
          params: { category: category }
        });
        setProducts(response.data.product);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);
  console.log(products);
  return (
    <div className="Products-container">
      <Filter />
      <div style={{ width: "100%" }}>
        <Product product = {products}/>
      </div>
    </div>
  );
}
