import React, { useEffect, useState } from "react";
import Image from "next/image";
import loginBgDesktop from "../../assets/login/loginBg-desktop.png";
import loginBgMobile from "../../assets/login/loginBg-mobile.png";
import { useAuth } from "@/contexts/authentication";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "../../components/ui/navigation-menu";
import Logo from "../../components/navigation-component/Logo";
import Link from "next/link";
import axios from "axios";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hotelData, setHotelData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { adminLogin } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    adminLogin({ username, password });
  };

  const getHotelData = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get("http://localhost:3000/api/getHotelData");
      setHotelData(result.data.data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    }
  };

  useEffect(() => {
    getHotelData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    <>
      <NavigationMenu className="flex items-center min-h-[48px] md:min-h-[100px] h-[5vh] border-[1px] border-[#E4E6ED] justify-center w-full">
        <div className="flex justify-between w-full px-[5%] xl:px-[10%]">
          <div className="flex justify-between text-[14px]  w-full">
            <div className="w-full flex items-center justify-between">
              <Logo hotelLogo={hotelData.hotel_logo} />
            </div>
            <div className="flex items-center justify-end">
              <Link href="/admin/login" legacyBehavior passHref>
                <NavigationMenuLink className="text-[1rem] ml-2 leading-4 font-semibold text-[#E76B39]">
                  <p className="whitespace-nowrap">Log in</p>
                </NavigationMenuLink>
              </Link>
            </div>
          </div>
        </div>
      </NavigationMenu>
      <main className="w-full md:max-w-[1440px] md:h-full flex md:flex-row flex-col items-center md:justify-center mx-auto gap-10 bg-[#F7F7FB]">
        <div className="w-full md:w-1/2 relative h-full max-w-[430px] md:max-w-[720px]">
          <Image
            src={loginBgDesktop}
            className="object-cover w-full h-full hidden md:block"
          />
          <Image
            src={loginBgMobile}
            className="object-cover w-full h-full md:hidden"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center ">
          <form
            className="w-full md:max-w-[452px] px-4 md:px-10 pb-10 flex flex-col gap-10 md:gap-[60px]"
            onSubmit={handleSubmit}
          >
            <h1 className="text-[44px] md:text-[68px] leading-[55px] md:leading-[85px] font-medium">
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
                {/* <p>
                  Don’t have an account yet?{" "}
                  <a href="/register" className="font-semibold text-[#E76B39]">
                    Register
                  </a>
                </p> */}
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default login;
