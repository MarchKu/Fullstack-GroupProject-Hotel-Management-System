import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
// import userImage from "../../assets/Navigation/UserImage.png";
import profileIcon from "../../assets/Navigation/profileIcon.png";
import cardIcon from "../../assets/Navigation/cardIcon.png";
import bookingIcon from "../../assets/Navigation/bookingIcon.png";
import logoutIcon from "../../assets/Navigation/logoutIcon.png";
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/router";

const UserMenuDesktop = (props) => {
  const { logout } = useAuth();
  const router = useRouter();
  const { image, name,username, isLoading } = props;
  const [profileImage, setProfileImage] = useState(image);
  useEffect(() => {
    setProfileImage(image);
  }, [image]);
  return (
    <Menubar className="hidden md:flex rounded-full border-0">
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-2 ">
          <div className="flex gap-3 items-center">
            <Image
              src={profileImage}
              alt="User"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-contain"
            />
            <h6 className="text-start">{name}</h6>
          </div>
        </MenubarTrigger>
        <MenubarContent className="w-[198px] px-[14px] py-2 md:mx-4">
          <MenubarItem
            className="gap-3 px-0 py-2"
            onClick={() => router.push("/profile")}
          >
            <Image src={profileIcon} className="w-4 h-4" />
            <p>Profile</p>
          </MenubarItem>
          <MenubarItem className="gap-3 px-2">
            <Image src={cardIcon} className="w-4 h-4" />
            <p>Payment Method</p>
          </MenubarItem>
          <MenubarItem className="gap-3 px-2" onClick={() => router.push(`/booking/${username}?page=1`)}>
            <Image src={bookingIcon} className="w-4 h-4" />
            <p>Booking History</p>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="gap-3 px-2" onClick={() => logout()}>
            <Image src={logoutIcon} />
            <p>Log out</p>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserMenuDesktop;
