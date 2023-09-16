"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Grid, Alert } from '@mui/material';
import { ProductFormData } from '../interface/interface';
import { useSelector } from 'react-redux';
const ProductForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    seller: '',
    images: [],
    price: '',
    category: '',
    subcategory: '',
    stock: ''
  });
  const sellerInfo = useSelector((state:any)=>state.auth);
  console.log(sellerInfo);
  if (!sellerInfo.userInfo || !sellerInfo.isSeller) {
    <Alert severity='error'>Please Login as a Seller</Alert>
    router.push('/');
    return null; // Return null to prevent rendering of the form
  }
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);
    setFormData({
      ...formData,
      images: formData.images.concat(files)
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('seller', sellerInfo.userInfo.id);
    formData.images.forEach((image, index) => {
      formDataToSend.append(`images`, image);
    });
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('subcategory', formData.subcategory);
    formDataToSend.append('stock', formData.stock);

    try {
      const response = await fetch('http://localhost:3000/insertProduct', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product Added:', data.new_product);
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  function handleRemoveImage(index: number): void {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({...formData,
    images:newImages
  })
  }

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
          <input
              accept="image/*"
              type="file"
              id="contained-button-file"
              multiple
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Upload Images
              </Button>
            </label>
            <div style={{ marginTop: '10px' }}>
            {formData.images.map((image, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index}`}
                    style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                  />
                  <Button variant="outlined" color="secondary" onClick={() => handleRemoveImage(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Subcategory"
              variant="outlined"
              fullWidth
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              variant="outlined"
              fullWidth
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ProductForm;
