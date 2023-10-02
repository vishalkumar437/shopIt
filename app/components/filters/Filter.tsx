import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const Filter = ({ onFilterChange, subCat }: any) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const handleSubcategoryChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedSubcategory(event.target.value);
    onFilterChange(event.target.value, minPrice, maxPrice);
  };

  const handleMinPriceChange = (event: { target: { value: any } }) => {
    setMinPrice(Number(event.target.value));
    onFilterChange(selectedSubcategory, Number(event.target.value), maxPrice);
  };

  const handleMaxPriceChange = (event: { target: { value: any } }) => {
    setMaxPrice(Number(event.target.value));
    onFilterChange(selectedSubcategory, minPrice, Number(event.target.value));
  };

  return (
    <Box p={2}>
      <h2>Filter</h2>
      <FormControl
        fullWidth
        variant="outlined"
        style={{ marginBottom: "16px" }}
      >
        <InputLabel>Subcategory</InputLabel>
        <Select
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          label="Subcategory"
        >
          {subCat?.map((sub:string, index:number) => (
            <MenuItem key={index} value={sub}>
              {sub}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Min Price"
        type="number"
        variant="outlined"
        value={minPrice}
        onChange={handleMinPriceChange}
        style={{ marginBottom: "16px" }}
      />

      <TextField
        fullWidth
        label="Max Price"
        type="number"
        variant="outlined"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
    </Box>
  );
};

export default Filter;
