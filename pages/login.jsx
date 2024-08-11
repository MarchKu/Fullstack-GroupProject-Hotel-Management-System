import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import { useAuth } from "@/contexts/authentication";
import useUserProfile from "@/hooks/use-user-profile";
import useHotelData from "@/hooks/use-hotel-data";
import Link from "next/link";

const Login = () => {
  const { userData, getUserProfile, putUserProfile, isLoading, isError } =
    useUserProfile();
  const { hotelData, getHotelData } = useHotelData();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      }
    };
    fetchUserData();
    getHotelData();
  }, [getHotelData]);

  /* Data fetching */
  useEffect(() => {
    if (user) {
      getUserProfile(user.username);
    }
    console.log(userData);
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, [user, getUserProfile, userData]);

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
      <NavbarComponent />
      <main className="w-full min-h-[93vh] h-auto md:h-[93vh] flex md:flex-row flex-col items-center md:justify-center mx-auto gap-10 bg-[#F7F7FB]">
        <div className="size-full flex flex-col md:flex-row">
          <div
            className="h-[250px] md:h-full w-full md:w-[45%] bg-cover bg-center"
            style={{ backgroundImage: `url(/login/loginBg-desktop.png)` }}
          ></div>
          <div className="h-auto md:h-auto w-full md:w-[55%] flex flex-col items-center justify-center font-body ">
            <form
              className="w-full md:max-w-[452px] px-4 md:px-10 py-4 flex flex-col gap-[1.5rem] md:gap-[60px]"
              onSubmit={handleSubmit}
            >
              <h1 className="text-[44px] md:text-[68px] leading-[55px] md:leading-[85px] font-medium font-heading">
                Log In
              </h1>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Username or Email</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-[#D6D9E4] border-[1px] rounded text-base"
                    placeholder="Enter your username or email"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border-[#D6D9E4] border-[1px] rounded text-base"
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[#C14817] text-white rounded"
                  >
                    Log In
                  </button>
                  <p>
                    Don’t have an account yet?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-[#E76B39]"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
