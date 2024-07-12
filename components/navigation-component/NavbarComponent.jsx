import Link from "next/link";
import Image from "next/image";
import { NavigationMenu, NavigationMenuLink } from "../ui/navigation-menu";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";
import { MenuIcon } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";
import userImage from "../../assets/Navigation/UserImage.png";
import bellIcon from "../../assets/Navigation/bellIcon.png";
import profileIcon from "../../assets/Navigation/profileIcon.png";
import cardIcon from "../../assets/Navigation/cardIcon.png";
import bookingIcon from "../../assets/Navigation/bookingIcon.png";
import logoutIcon from "../../assets/Navigation/logoutIcon.png";
import neatlyLogo from "../../assets/Navigation/neatlyLogo.png";
import notiImage from "../../assets/Navigation/NotiImage.png";
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/router";
import Notification from "./Notification";
import UserMenuMobile from "./UserMenuMobile";
import UserMenuDesktop from "./UserMenuDesktop";
import Logo from "./Logo";
import NavLinkDesktop from "./NavLinkDesktop";
import NonUserMenuMobile from "./NonUserMenuMobile";

const NavbarComponent = ({ isAuthenticated }) => {
  const AuthenticatedUser = (
    <NavigationMenu className="flex justify-center items-center w-full h-[5vh] md:h-[10vh] px-[5%] md:px-[10%] border-[1px] border-gray-300">
      <div className="w-full flex justify-between items-center text-[1rem] ">
        <div className="flex w-[30%] items-center ">
          <Logo />
          <NavLinkDesktop />
        </div>
      </div>

      <div className="flex items-center gap-1 h-10 justify-end">
        <Notification />
        <UserMenuMobile />
        <UserMenuDesktop />
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
