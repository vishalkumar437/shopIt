import React from "react";
import "./Login.css";
import axios from "axios";
import Link from "next/link";

function Login() {

  const handleSignIn = ()=>{
    
  }

  return (
    <div className="Login-mainDiv">
      <div className="Login-left">
        <h2>Login</h2>
        <p>Access Your Orders, Recommendation, Carts.</p>
      </div>
      <div className="Login-right">
        <h3>Email</h3>
        <input type="text" placeholder="Email"></input>
        <h3>Password</h3>
        <input type="password" placeholder="Password"></input>
        <button className="Login-submitbutton">Login</button>
        <p>Don't have a account <Link href="register">Register</Link></p>
        <p>Seller?<Link href="/sellerlogin">Login</Link></p>
      </div>
    </div>
  );
}

export default Login;
