"use client";

import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../utils/firebase-config/firebase.js";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const login = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify(userDataFromToken));
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
      await axios.post("http://localhost:3000/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toastr["success"]("You are successfully registered");
      setTimeout(function () {
        window.location.replace("/login");
      }, 1000);
    } catch (error) {
      console.log(error.message);
      toastr["error"]("Registration Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toastr["success"]("Logged out successfully");
    setTimeout(function () {
      window.location.replace("/");
    }, 1000);
  };

  const adminLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const admin = auth.currentUser;
      localStorage.setItem("auth", true);
      toastr["success"]("Admin logged in successfully");
      window.location.replace("/admin/hotel-information");
    } catch (error) {
      console.log(error.message);
      toastr["error"]("Invalid username, email or password");
      window.location.replace("/admin/login");
    }
  };

  const adminLogout = async () => {
    try {
      auth.signOut();
      localStorage.removeItem("auth");
      localStorage.removeItem("admin");
      window.location.replace("/admin/login");
      toastr["success"]("Admin logged out successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, register, adminLogin, adminLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
