import React from "react";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import bellIcon from "../../assets/Navigation/bellIcon.png";

import notiImage from "../../assets/Navigation/NotiImage.png";


const Notification = () => {
  return (
    <Menubar className="flex rounded-full border-0 p-0">
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-1">
          <Image
            src={bellIcon}
            alt="bell icon"
            className="min-w-6 min-h-6 md:min-w-10 md:min-h-10"
          />
        </MenubarTrigger>
        <MenubarContent className="md:w-[370px] md:h-auto w-screen h-screen px-2 py-2 md:absolute md:top-0 right-[-32px] md:right-[-50px]">
          <MenubarItem className="gap-3 px-2 py-4 flex items-start">
            <Image src={notiImage} className="w-8 h-8 rounded-full" />
            <p className="w-full">
              Tomorrow is your check-in date with Super Premier View Room
              <span className="font-semibold">{` ‘Th, 19 Oct 2022’ `}</span>
              We will wait for your arrival!
            </p>
          </MenubarItem>
          <MenubarItem className="gap-3 px-2 py-4 flex items-start">
            <Image src={notiImage} className="w-8 h-8 rounded-full" />
            <p>
              Tomorrow is your check-in date with Super Premier View Room
              <span className="font-semibold">{` ‘Th, 19 Oct 2022’ `}</span>
              We will wait for your arrival!
            </p>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Notification;
