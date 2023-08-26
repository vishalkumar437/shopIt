import React from "react";
import "./Register.css";
import axios from "axios";
import Link from "next/link";

function Register() {

  const handleSignIn = ()=>{
    
  }

  return (
    <div className="Register-mainDiv">
      <div className="Register-left">
        <h2>Register</h2>
        <p>Order, Save your address, cart access.</p>
      </div>
      <div className="Register-right">
        <h3>Email</h3>
        <input type="text" placeholder="Email"></input>
        <h3>Password</h3>
        <input type="password" placeholder="Password"></input>
        <button className="Register-submitbutton">Register</button>
        <p>Already have a account <Link href="/login">Login</Link></p>
        <p>Seller?<Link href="/sellerRegister">Register</Link></p>
      </div>
    </div>
  );
}

export default Register;
