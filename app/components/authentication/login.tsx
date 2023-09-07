"use client";

import React, { useState } from "react";
import axios from "axios";
import {user} from "../../interface/interface";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { userLogin } from "@/app/action";

function Login({isLogin,isLoginClicked}:any) {
  const dispatch = useDispatch();
  const [isUser, setUser] = useState<boolean>(true);
  const [formData, setFormData] = useState<user>({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Use the correct syntax to update formData
    setFormData((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };
  const handleRegisterPage = ()=>{
      isLogin();
  }

  const handleSignIn = () => {
    const data = {
      email: formData.email,
      password: formData.password,
    };
    const link = isUser?"http://localhost:3000/userLogin":"http://localhost:3000/sellerLogin";
    console.log(data);
    axios
      .post(link, data, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          if(isUser){
            dispatch(userLogin({
              name: response.data.name,
              id: response.data.id
            }))
          }
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

  const handleClose = ()=>{
    isLoginClicked();
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "strech",
      }}
    >
      <Button sx={{position:"fixed",right:0}} onClick={handleClose}>X</Button>
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
          SignIn
        </Button>
        <Typography variant="h6">
          Don&apos;t have a account <Button onClick={handleRegisterPage}>Register</Button>
        </Typography>
        <Typography>
          Seller?<Button onClick={changeUser}>Login</Button>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;