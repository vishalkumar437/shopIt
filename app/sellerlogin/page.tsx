import React from "react";
import "./Login.css";
import axios from "axios";

function Login() {

  const handleSignIn = ()=>{
    
  }
  return (
    <div className="Login-mainDiv">
      <div className="Login-left">
        <h2>Login</h2>
        <p>Access Your Customers, Sales, Discounts.</p>
      </div>
      <div className="Login-right">
        <h3>Email</h3>
        <input type="text" placeholder="Email"></input>
        <h3>Password</h3>
        <input type="password" placeholder="Password"></input>
        <button className="Login-submitbutton">Login</button>
        <p>Don't have a account <a href="register">Register</a></p>
        <p>Seller?<a href="/sellerlogin">Login</a></p>
      </div>
    </div>
  );
}

export default Login;
