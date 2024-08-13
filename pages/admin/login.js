import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/authentication";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "../../components/ui/navigation-menu";
import Logo from "../../components/navigation-component/Logo";
import Link from "next/link";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hotelData, setHotelData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { adminLogin } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    adminLogin({ email, password });
  };

  const getHotelData = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        "https://neatly-hotel.vercel.app/api/getHotelData"
      );
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

  return (
    <>
      <NavigationMenu className="flex items-center min-h-[48px] md:min-h-[100px] h-[5vh] border-[1px] border-[#E4E6ED] justify-center w-full px-4">
        <div className="flex justify-between w-full">
          <div className="flex justify-between text-[14px]  w-full">
            <div className="flex justify-between w-full items-center gap-6 text-[14px]">
              {isLoading ? (
                <Skeleton className="w-[50px] h-[20px] rounded-full bg-slate-300" />
              ) : isError ? (
                <p>Error</p>
              ) : (
                <Link href="/">
                  <div
                    className="w-[94px] h-[25px] md:w-[167px] md:h-[45px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${hotelData.hotel_logo})` }}
                  ></div>
                </Link>
              )}
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
      <main className="w-full min-h-[93vh] h-auto md:h-[93vh] flex md:flex-row flex-col items-center md:justify-center mx-auto gap-10 bg-[#F7F7FB]">
        <div className="size-full flex flex-col md:flex-row">
          <div
            className="h-[250px] md:h-full w-full md:w-[45%] bg-cover bg-center"
            style={{ backgroundImage: `url(/login/loginBg-desktop.png)` }}
          ></div>
          <div className="h-[60%] md:h-auto w-full md:w-[55%] flex flex-col items-center justify-center font-body ">
            <form
              className="w-full md:max-w-[452px] p-4 md:px-10 flex flex-col gap-10 md:gap-[60px]"
              onSubmit={handleSubmit}
            >
              <h1 className="text-[44px] md:text-[68px] leading-[55px] md:leading-[85px] font-medium font-heading">
                Log In
              </h1>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-[#D6D9E4] border-[1px] rounded text-base"
                    placeholder="Enter your email"
                    onChange={(e) => {
                      setEmail(e.target.value);
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
