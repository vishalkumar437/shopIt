"use client"

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import user from "../../interface/interface";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material"

function Login() {
  const [formData, setFormData] = useState<user>({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignIn = () => {
    const data = {
      email: formData.email,
      password: formData.password,
    };
    console.log(data);
    axios
      .post("https:localhost:3000/userLogin", data, {
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
          display: "flex",
          flexDirection: "column",
          padding: 2,
          flexGrow: 1,
          backgroundColor: "rgba(126, 192, 240, 0.878)",
          color: "white",
        }}
      >
        <Typography variant="h2">Login</Typography>
        <Typography variant="h6">Access Your customers, sales, stock.</Typography>
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
        <Typography variant="h5">Email</Typography>
        <TextField
          type="text"
          placeholder="Email"
          name="email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {handleInputChange}}
        />
        <Typography variant="h5">Password</Typography>
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {handleInputChange}}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleSignIn}
        >
          SignIn
        </Button>
        <Typography variant="h6">
          Don't have a account <a href="register">Register</a>
        </Typography>
        <Typography variant="h6">
          User?<Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
