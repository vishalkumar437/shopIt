import { Container, Grid, TextField, Button } from '@mui/material';

const DeliveryForm = ({set}:any) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    set((prevState: any) => ({ ...prevState, [name]: value }));
  };
  return (
    <Container maxWidth="sm">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              name="fullName"
              required
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              name="address"
              required
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              name="city"
              required
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pincode"
              variant="outlined"
              name="pincode"
              required
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="phone"
              required
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default DeliveryForm;