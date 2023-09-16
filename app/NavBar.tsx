"use client";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import AuthenticationPage from "./components/authentication/page";
import { Provider } from "react-redux";
import store from "./store/store";

function NavBar() {
  const [isLoginOpen, setLoginOpen] = useState<boolean>(false);

  const handleLoginClick = () => {
    setLoginOpen(!isLoginOpen);
  };
  return (
    <Provider store={store}>
      <div>
        <Navbar isLoginClicked={handleLoginClick} />
        {isLoginOpen && (
          <div className="login-popup">
            <div className="login-popup-inner">
              <AuthenticationPage isLoginClicked={handleLoginClick} />
            </div>
          </div>
        )}
      </div>
    </Provider>
  );
}

export default NavBar;
