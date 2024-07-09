"use client";

import Image from "next/image";
import frontview from "../assets/login/frontview.jpg";
import { useState } from "react";
import { useAuth } from "@/contexts/authentication";

export default function LogInTest() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };
    login(data);
  };

  return (
    <>
      <div className="w-screen h-[10vh]"></div>
      <div className="flex flex-row">
        <Image
          className="w-[49vw] h-[90vh]"
          src={frontview}
          alt="frontview image"
        />
        <div className="w-[51vw] h-[90vh]">
          <div className="login-form flex flex-col items-start w-[452px] mt-24 ml-20">
            <h1 className="title font-medium text-[#2F3E35] text-6xl font-heading mb-16">
              Log In
            </h1>
            <div className="form-container w-full flex flex-col gap-10">
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username or Email</label>
                <input
                  className="login-input"
                  name="username"
                  type="text"
                  placeholder="Enter your username or email"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                <label htmlFor="password"> Password</label>
                <input
                  className="login-input"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button className="submit-button" type="submit">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
