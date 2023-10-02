import React from 'react';
import { Container, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CardPaymentDetails = ({set,paymentMethod}:any) => {
  const handlePaymentMethodChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    set(event.target.value);
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
                <MenuItem value="COD">Cash On Delivery</MenuItem>
                <MenuItem value="stripe">Others(Stripe)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CardPaymentDetails;
