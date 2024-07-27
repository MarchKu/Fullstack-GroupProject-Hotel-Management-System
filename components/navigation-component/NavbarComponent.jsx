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

const NavbarComponent = ({ isAuthenticated, userData, hotelData }) => {

  console.log(hotelData);

  const AuthenticatedUser = (
    <NavigationMenu className="flex items-center min-h-[48px] md:min-h-[100px] h-[5vh] border-[1px] border-[#E4E6ED] justify-center w-full">
      <div className="flex justify-between w-full px-[5%] xl:px-[10%]">
        <div className="flex justify-between text-[14px]  md:w-full">
          <div className="w-full flex items-center justify-between">
            {hotelData ? (
              <>
                <Logo hotelLogo={hotelData.data.hotel_logo} />
                <NavLinkDesktop hotelName={hotelData.data.hotel_name} />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Notification />

          <UserMenuMobile
            image={userData?.profile_picture}
            name={userData?.fullName}
          />
          <UserMenuDesktop
            image={userData?.profile_picture}
            name={userData?.full_name}
          />
        </div>
      </div>
    </NavigationMenu>
  );

  const UnauthenticatedUser = (
    <NavigationMenu className="flex items-center min-h-[48px] md:min-h-[100px] h-[5vh] border-[1px] border-[#E4E6ED] justify-center w-full">
      <div className="flex justify-between w-full px-[5%] xl:px-[10%]">
        <div className="flex justify-between text-[14px]  w-full">
          <div className="w-full flex items-center justify-between">
            {hotelData ? (
              <>
                <Logo hotelLogo={hotelData.data.hotel_logo} />
                <NavLinkDesktop hotelName={hotelData.data.hotel_name} />
                <NonUserMenuMobile hotelName={hotelData.data.hotel_name} />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="hidden md:flex items-center justify-end">
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className="text-[1rem] ml-2 leading-4 font-semibold text-[#E76B39]">
                <p className="whitespace-nowrap">Log in</p>
              </NavigationMenuLink>
            </Link>
          </div>
        </div>
      </div>
    </NavigationMenu>
  );

  return isAuthenticated ? AuthenticatedUser : UnauthenticatedUser;
};

export default NavbarComponent;
