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
import { useAuth } from "@/contexts/authentication";
import UserImage from "../../assets/Navigation/UserImage.png";

const NavbarComponent = ({ isAuthenticated }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("user:", user);
    console.log("user:", user.fullName);
  }, [user]);
  const AuthenticatedUser = (
    <NavigationMenu className="flex justify-center items-center w-full h-[5vh] md:h-[10vh] px-[5%] md:px-[10%] border-[1px] border-gray-300">
      <div className="w-full flex justify-between items-center text-[1rem] ">
        <div className="flex w-[30%] items-center ">
          <Logo />
          <NavLinkDesktop />
        </div>
      </div>
      {/* <Image src={user.profilePicture} width={50} height={50}></Image> */}
      <div className="flex items-center gap-1 h-10 justify-end">
        <Notification />
        <UserMenuMobile image={user.profilePicture} name={user.fullName} />
        <UserMenuDesktop image={user.profilePicture} name={user.fullName} />
      </div>
    </NavigationMenu>
  );

  const UnauthenticatedUser = (
    <NavigationMenu className="flex justify-center items-center w-full h-[5vh] md:h-[10vh] px-[5%] md:px-[10%] border-[1px] border-gray-300">
      <div className="w-full flex justify-between items-center text-[1rem]">
        <div className="w-full max-w-[768px] flex items-center justify-between">
          <Logo />
          <NavLinkDesktop />
          <NonUserMenuMobile />
        </div>
        <div className="hidden md:flex items-center mr-4 min-w-10">
          <Link href="/login" legacyBehavior passHref>
            <NavigationMenuLink className="text-[1rem] leading-4 font-semibold text-[#E76B39]">
              Log in
            </NavigationMenuLink>
          </Link>
        </div>
      </div>
    </NavigationMenu>
  );

  return isAuthenticated ? AuthenticatedUser : UnauthenticatedUser;
};

export default NavbarComponent;
