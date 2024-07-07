import Link from "next/link";
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
import NeatlyLogo from "../assets/images/logo.svg";
import { useMediaQuery } from "@/hooks/use-media-query.jsx";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { MenuIcon } from "lucide-react";

const NavbarComponent = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    // flex justify-between max-w-[1024px] mx-auto

    isDesktop ? (
      <NavigationMenu className="flex items-center border-[1px] border-[#E4E6ED] justify-center w-screen">
        <div className="min-w-[768px] flex justify-between text-[14px] px-[16px]">
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
          <div className="flex items-center">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="text-[14px] leading-[16px] font-semibold text-[#E76B39]">
                Log in
              </NavigationMenuLink>
            </Link>
          </div>
        </div>
      </NavigationMenu>
    ) : (
      <NavigationMenu className="flex items-center border-[1px] border-[#E4E6ED] justify-center w-screen">
        <div className="min-w-[768px] flex justify-between text-[14px] px-[16px]">
          <div className="w-full max-w-[660px] flex items-center justify-between">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="">
                <NeatlyLogo />
              </NavigationMenuLink>
            </Link>
          </div>
          <div className="flex items-center">
            {/* <Drawer direction="right">
              <DrawerTrigger>
                <MenuIcon />
              </DrawerTrigger>
              <DrawerContent>some content</DrawerContent>
            </Drawer> */}
          </div>
        </div>
      </NavigationMenu>
    )
  );
};

export default NavbarComponent;
