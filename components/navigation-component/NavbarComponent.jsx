"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NavigationMenu, NavigationMenuLink } from "../ui/navigation-menu";

import Notification from "./Notification";
import UserMenuMobile from "./UserMenuMobile";
import UserMenuDesktop from "./UserMenuDesktop";
import Logo from "./Logo";
import NavLinkDesktop from "./NavLinkDesktop";
import NonUserMenuMobile from "./NonUserMenuMobile";
import axios from "axios";
import { useAuth } from "@/contexts/authentication";
import UserImage from "../../assets/Navigation/UserImage.png";
import NotificationMenu from "./NotificationMenu";

const NavbarComponent = () => {
  const [hotelData, setHotelData] = useState({});
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userToken = localStorage.getItem("user");
      if (userToken) {
        const parsedData = JSON.parse(userToken);
        setUser(parsedData);
      }
    };

    const getHotelData = async () => {
      const result = await axios.get(
        "https://neatly-hotel.vercel.app/api/getHotelData"
      );
      setHotelData(result.data.data);
    };

    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
    fetchUser();
    getHotelData();
  }, []);

  useEffect(() => {
    const getUserData = async (username) => {
      if (user) {
        const result = await axios.get(
          `https://neatly-hotel.vercel.app/api/user-profile/${username}`
        );
        setUserData(result.data);
      }
    };
    if (user) {
      getUserData(user.username);
    }
  }, [user]);

  const setNotification = async (data) => {
    try {
      await axios.post(
        "https://neatly-hotel.vercel.app/api/notification",
        data
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      const users = {
        id: `user-${user.userId}`,
        user_id: user.userId,
      };
      setUserId(users.id);
      setNotification(users);
    }
  }, [user]);

  const AuthenticatedUser = (
    <NavigationMenu className="flex items-center min-h-[48px] md:min-h-[100px] h-[5vh] border-[1px] border-[#E4E6ED] justify-center w-full px-4">
      <div className="flex justify-between w-full">
        <div className="flex justify-between text-[14px]">
          <div className="flex items-center gap-6">
            {hotelData ? (
              <>
                {/* <Logo hotelLogo={hotelData.hotel_logo} /> */}
                <Link href="/">
                  <div
                    className="w-[94px] h-[25px] md:w-[167px] md:h-[45px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${hotelData.hotel_logo})` }}
                  ></div>
                </Link>
                <NavLinkDesktop hotelName={hotelData.hotel_name} />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {/* <Notification /> */}
          <NotificationMenu userId={userId} />

          <UserMenuMobile
            image={userData?.profile_picture}
            name={userData?.full_name}
            username={userData?.username}
          />
          <UserMenuDesktop
            image={userData?.profile_picture}
            name={userData?.full_name}
            username={userData?.username}
          />
        </div>
      </div>
    </NavigationMenu>
  );

  const UnauthenticatedUser = (
    <NavigationMenu className="flex items-center min-h-[48px] md:min-h-[100px] h-[5vh] border-[1px] border-[#E4E6ED] justify-center w-full px-4">
      <div className="flex justify-between w-full">
        <div className="flex justify-between items-center w-full gap-6 text-[14px]">
          {hotelData ? (
            <>
              <Link href="/">
                <div
                  className="w-[94px] h-[25px] md:w-[167px] md:h-[45px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${hotelData.hotel_logo})` }}
                ></div>
              </Link>
              <NavLinkDesktop hotelName={hotelData.hotel_name} />
              <NonUserMenuMobile hotelName={hotelData.hotel_name} />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="hidden md:flex items-center justify-end">
          <Link href="/login" legacyBehavior passHref>
            <NavigationMenuLink className="text-[1rem] px-[14px] py-2 md:mx-4 font-semibold text-[#E76B39]">
              <p className="whitespace-nowrap ">Log in</p>
            </NavigationMenuLink>
          </Link>
        </div>
      </div>
    </NavigationMenu>
  );

  return isAuthenticated ? AuthenticatedUser : UnauthenticatedUser;
};

export default NavbarComponent;
