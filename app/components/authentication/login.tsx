"use client";

import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { user } from "../../interface/interface";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { sellerLogin, userLogin } from "@/app/action";
import { useCookies } from 'next-client-cookies';

function Login({ isLogin, isLoginClicked }: any) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const Cookies = useCookies();
  const dispatch = useDispatch();
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
  const handleRegisterPage = () => {
    isLogin();
  };

  const handleSignIn = () => {
    setLoading(true);
    const data = {
      email: formData.email,
      password: formData.password,
    };
    const link = isUser
      ? `${process.env.NEXT_PUBLIC_API_LINK}/userLogin`
      : `${process.env.NEXT_PUBLIC_API_LINK}/sellerLogin`;
    axios
      .post(link, data, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (isUser) {
            dispatch(
              userLogin({
                name: response.data.name,
                id: response.data.id,
              })
            );
          } else {
            dispatch(
              sellerLogin({
                name: response.data.name,
                id: response.data.id,
              })
            );
          }
          Cookies.set("isLoggedIn", "true");
          Cookies.set(
            "userDetails",
            JSON.stringify({
              name: response.data.name,
              id: response.data.id,
              isSeller: !isUser,
            })
          );
          isLoginClicked();
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          document.getElementById("Error")!.innerText =
            "Email or Password Invalid";
        } else if (error.response.status === 404) {
          document.getElementById("Error")!.innerText = "Email Not Registered";
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeUser = () => {
    setUser(!isUser);
  };

  const handleClose = () => {
    isLoginClicked();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "strech",
      }}
    >
      <Button sx={{
        position: "absolute",
        left:"68%",
        zIndex: 1,
      }} onClick={handleClose}>
        X
      </Button>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          padding: 2,
          flexGrow: 1,
          backgroundColor: "rgba(126, 192, 240, 0.878)",
          color: "white",
          maxWidth: "20vw",
        }}
      >
        <Typography variant="h2">Login</Typography>
        {isUser ? (
          <Typography variant="h6">
            Access Your Orders, Recommendation, Carts.
          </Typography>
        ) : (
          <Typography variant="h6">
            Access Your customers, sales, stock.
          </Typography>
        )}
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
        <Typography variant="h4">{isUser ? "User" : "Seller"}</Typography>
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
          {isLoading ? <CircularProgress /> : "SignIn"}
        </Button>
        <div id="Error"></div>
        <Typography variant="h6">
          Don&apos;t have a account{" "}
          <Button onClick={handleRegisterPage}>Register</Button>
        </Typography>
        <Typography>
          Seller?<Button onClick={changeUser}>Login</Button>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
