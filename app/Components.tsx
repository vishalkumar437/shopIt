"use client"
import React, { useState } from "react";
import Navbar from "./components/navbar";
import Home from "./home/page";
import AuthenticationPage from "./components/authentication/page";
export default function Components() {
    const [isLoginOpen, setLoginOpen] = useState<boolean>(false);

  const handleLoginClick = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <div>
      <div>
        <Navbar isLoginClicked = {handleLoginClick}/>
        {isLoginOpen && (
          <div className="login-popup">
            <div className="login-popup-inner">
              <AuthenticationPage isLoginClicked = {handleLoginClick}/>
            </div>
          </div>
        )}
        <Home />
      </div>
    </div>
  );
}
