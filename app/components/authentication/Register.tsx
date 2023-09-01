"use client";

import React, { useState } from "react";
import axios from "axios";
import user from "../../interface/interface";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function Register({isLogin}:any) {
  const [isUser, setUser] = useState<boolean>(true);
  const [formData, setFormData] = useState<user>({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };
  const handleLoginrPage = ()=>{
      isLogin();
  }

  const handleSignIn = () => {
    const data = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
    };
    const link = isUser?"https:localhost:3000/userRegister":"https:localhost:3000/sellerRegister";
    console.log(data);
    axios
      .post(link, data, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const changeUser = () => {
    setUser(!isUser);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "strech",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          padding: 2,
          flexGrow: 1,
          backgroundColor: "rgba(126, 192, 240, 0.878)",
          color: "white",
          maxWidth:"20vw"
        }}
      >
        <Typography variant="h2">Login</Typography>
        {isUser? <Typography variant="h6">
          Access Your Orders, Recommendation, Carts.
        </Typography>:<Typography variant="h6">Access Your customers, sales, stock.</Typography>}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          padding: 4,
        }}
      >
        <Typography variant="h4">{isUser?"User":"Seller"}</Typography>
        <TextField
          type="text"
          placeholder="Name"
          name="name"
          label="Name"
          sx={{ marginTop: "30px" }}
          onChange={handleInputChange}
        />
        <TextField
          type="text"
          placeholder="Email"
          name="email"
          label="Email"
          sx={{ marginTop: "30px" }}
          onChange={handleInputChange}
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          label="Password"
          sx={{ marginTop: "30px" }}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleSignIn}
        >
          Register
        </Button>
        <Typography variant="h6">
          Already have a account <Button onClick={handleLoginrPage}>Login</Button>
        </Typography>
        <Typography>
          Seller?<Button onClick={changeUser}>Register</Button>
        </Typography>
      </Box>
    </Box>
  );
}

export default Register;
