import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const login = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );
      const token = result.data.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token) || "";
      }
      const userDataFromToken = jwtDecode(token);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", userDataFromToken) || "";
      }
      toastr["success"]("You are successfully logged in");
      setTimeout(function () {
        window.location.replace("/");
      }, 1000);
    } catch (error) {
      console.log(error.message);
      toastr["error"]("Invalid username, email or password");
    }
  };

  const register = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", data);
      toastr["success"]("You are successfully registered");
      setTimeout(function () {
        window.location.replace("/login");
      }, 1000);
    } catch (error) {
      console.log(error.message);
      toastr["error"]("Registration failed");
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token") || "";
      localStorage.removeItem("user") || "";
    }
    toastr["success"]("Logged out successfully");
    setTimeout(function () {
      window.location.replace("/login");
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ login, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
}
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
