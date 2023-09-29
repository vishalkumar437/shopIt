"use client"
import React, { useState } from 'react';
import { Container, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CardPaymentDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select
                label="Payment Method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <MenuItem value="creditCard">Credit Card</MenuItem>
                <MenuItem value="debitCard">Debit Card</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="netBanking">Net Banking</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {(paymentMethod === 'debitCard'||paymentMethod === 'creditCard') && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  variant="outlined"
                  required
                />
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Container>
  );
};

export default CardPaymentDetails;
