import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../components/ui/navigation-menu.jsx";
import { MenubarSeparator } from "./ui/menubar.jsx";
import NeatlyLogo from "../assets/images/logo.svg";
import Bell from "../assets/images/bell.svg";
import userImage from "../assets/images/photo.png";
import neatlyMobile from "../assets/images/mobile-logo.png";
import { useMediaQuery } from "@/hooks/use-media-query.jsx";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { MenuIcon } from "lucide-react";

const NavbarComponent = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isUser = true;
  return (
    // flex justify-between max-w-[1024px] mx-auto

    isDesktop ? (
      <NavigationMenu className="flex items-center h-[100px] border-[1px] border-[#E4E6ED] justify-center w-screen">
        <div className=" flex justify-between text-[14px] px-[16px] w-[1120px]">
          <div className="w-full max-w-[660px] flex items-center justify-between">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="">
                <NeatlyLogo />
              </NavigationMenuLink>
            </Link>
            <div className="w-full max-w-[444px]">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="px-[24px]">
                  About Neatly
                </NavigationMenuLink>
              </Link>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="px-[24px]">
                  Service & Facilities
                </NavigationMenuLink>
              </Link>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="px-[24px]">
                  Rooms & Suits
                </NavigationMenuLink>
              </Link>
            </div>
          </div>

          {isUser ? (
            <div className="flex items-center gap-4 max-w-[163px] h-10">
              <Link href="/" legacyBehavior passHref>
                <Bell />
              </Link>
              <div className="flex items-center w-[107px] gap-2">
                <Image src={userImage}></Image>
                <h6>Kate Cho</h6>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm leading-4 mr-4 font-semibold text-[#E76B39]">
                  Log in
                </NavigationMenuLink>
              </Link>
            </div>
          )}
        </div>
      </NavigationMenu>
    ) : (
      <NavigationMenu className="flex items-center h-12 border-[1px] border-[#E4E6ED] justify-center w-screen">
        <div className="flex w-screen justify-between text-[14px] px-[16px] py-[11px]">
          <div className="w-full max-w-[660px] flex items-center justify-between">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="w-[94px] h-[25px]">
                {/* <NeatlyLogo className="w-full h-full" /> */}
                <Image src={neatlyMobile} alt="" width={94} height={25} />
              </NavigationMenuLink>
            </Link>
          </div>
          <Drawer direction="right" className="">
            <DrawerTrigger>
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent className="w-screen mt-[48px]">
              <div className="mt-12 ">
                <div className="flex flex-col text-sm leading-4 gap-12 ml-8 mb-10 mx-4 ">
                  <Link href="/" className="mx-4">
                    About Neatly
                  </Link>
                  <Link href="/" className="mx-4">
                    Service & Facilities
                  </Link>
                  <Link href="/" className="mx-4">
                    Rooms & Suits
                  </Link>
                  <MenubarSeparator />
                  <Link href="/" className="mx-4 font-semibold text-[#E76B39]">
                    Log in
                  </Link>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </NavigationMenu>
    )
  );
};

export default NavbarComponent;
