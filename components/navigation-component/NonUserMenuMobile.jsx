import React from "react";
import Link from "next/link";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { MenuIcon } from "lucide-react";
import { MenubarSeparator } from "../ui/menubar";

const NonUserMenuMobile = () => {
  return (
    <Drawer direction="right" className="md:hidden block">
      <DrawerTrigger>
        <MenuIcon className="md:hidden " />
      </DrawerTrigger>
      <DrawerContent className="w-full mt-12 text-sm leading-4">
        <div className="mt-12 mx-4">
          <div className="flex flex-col gap-12 mb-10">
            <Link href="/" className="mx-4">
              About Neatly
            </Link>
            <Link href="/" className="mx-4">
              Service & Facilities
            </Link>
            <Link href="/" className="mx-4">
              Rooms & Suits
            </Link>
          </div>
          <MenubarSeparator className="mb-10" />
          <Link href="/login" className="mx-4 font-semibold text-[#E76B39]">
            Log in
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NonUserMenuMobile;
