import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";
import { MenuIcon } from "lucide-react";
import { MenubarSeparator } from "../ui/menubar";
import userImage from "../../assets/Navigation/UserImage.png";
import profileIcon from "../../assets/Navigation/profileIcon.png";
import cardIcon from "../../assets/Navigation/cardIcon.png";
import bookingIcon from "../../assets/Navigation/bookingIcon.png";
import logoutIcon from "../../assets/Navigation/logoutIcon.png";
import { useAuth } from "@/contexts/authentication";

const UserMenuMobile = (props) => {
  const { logout } = useAuth();
  const { image, name, username } = props;
  return (
    <Drawer direction="right" className="md:hidden flex">
      <DrawerTrigger>
        <MenuIcon className="md:hidden w-6 h-6" />
      </DrawerTrigger>
      <DrawerContent className="w-full mt-[48px] text-sm leading-4 px-4 py-6">
        <DrawerHeader>
          <DrawerTitle className="hidden">Navigation list</DrawerTitle>
          <DrawerDescription className="hidden">
            Item on the list: Profile, Booking History, and Log out
          </DrawerDescription>
        </DrawerHeader>
        <div>
          <Link href="/">
            <div className="flex items-center w-full gap-2 mb-4">
              <Image
                src={image}
                width={40}
                height={40}
                alt="user image"
                className="rounded-full object-cover"
              ></Image>
              <div
                className="break-words "
                style={{ width: "calc(100% - 40px - 8px)" }}
              >
                <h6 className="w-full">{name} </h6>
              </div>
            </div>
          </Link>

          <MenubarSeparator />

          <Link href="/profile">
            <div className="flex items-center w-[343px] gap-3 my-4">
              <Image src={profileIcon} alt="profile icon"></Image>
              <h6>Profile</h6>
            </div>
          </Link>
          <Link href={`/booking/${username}?page=1`}>
            <div className="flex items-center w-[343px] gap-3 my-4">
              <Image src={bookingIcon} alt="booking icon"></Image>
              <h6>Booking History</h6>
            </div>
          </Link>

          <MenubarSeparator />

          <Link href="/" onClick={() => logout()}>
            <div className="flex items-center w-[343px] gap-3 my-4">
              <Image src={logoutIcon} alt="logout icon"></Image>
              <h6>Log out</h6>
            </div>
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserMenuMobile;
