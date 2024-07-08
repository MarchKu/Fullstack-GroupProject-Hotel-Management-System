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
import userImage from "../assets/images/photo.png";
import bellIcon from "../assets/images/bell.png";
import profileIcon from "../assets/images/Frame.png";
import cardIcon from "../assets/images/credit.png";
import bookingIcon from "../assets/images/booking.png";
import logoutIcon from "../assets/images/logout.png";
import neatlyLogo from "../assets/images/NeatlyLogo.png";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";
import { MenuIcon } from "lucide-react";

const NavbarComponent = () => {
  const isUser = false;

  const AuthenticatedUser = (
    <NavigationMenu className="flex items-center md:h-[100px] h-[48px] border-[1px] border-[#E4E6ED] justify-center w-screen">
      <div className="flex justify-between text-[14px] px-[16px] w-[1120px]">
        <div className="w-full max-w-[768px] flex items-center justify-between">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              <Image
                src={neatlyLogo}
                alt="Neatly Logo"
                className="md:w-[167px] md:h-[45px] w-[94px] h-[25px]"
              />
            </NavigationMenuLink>
          </Link>
          <div className="w-full max-w-[444px] justify-between hidden md:flex">
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
          <Drawer direction="right" className="md:hidden block">
            <DrawerTrigger>
              <MenuIcon className="md:hidden" />
            </DrawerTrigger>
            <DrawerContent className="w-screen mt-[48px] text-sm leading-4">
              <DrawerHeader>
                <DrawerTitle className="hidden">Navigation list</DrawerTitle>
                <DrawerDescription className="hidden">
                  Item on the list: Profile, Payment Method, Booking History,
                  and Log out
                </DrawerDescription>
              </DrawerHeader>

              <div className="mt-6 mx-4">
                <div className="flex items-center w-[107px] gap-2 mb-4">
                  <Image src={userImage} alt="user image"></Image>
                  <h6>Kate Cho</h6>
                </div>

                <MenubarSeparator />

                <Link href="/">
                  <div className="flex items-center w-[343px] gap-3 mx-4 my-4">
                    <Image src={profileIcon} alt="profile icon"></Image>
                    <h6>Profile</h6>
                  </div>
                </Link>
                <Link href="/">
                  <div className="flex items-center w-[343px] gap-3 mx-4 my-4">
                    <Image src={cardIcon} alt="card icon"></Image>
                    <h6>Payment Method</h6>
                  </div>
                </Link>
                <Link href="/">
                  <div className="flex items-center w-[343px] gap-3 mx-4 my-4">
                    <Image src={bookingIcon} alt="booking icon"></Image>
                    <h6>Booking History</h6>
                  </div>
                </Link>

                <MenubarSeparator />

                <Link href="/">
                  <div className="flex items-center w-[343px] gap-3 mx-4 my-4">
                    <Image src={logoutIcon} alt="logout icon"></Image>
                    <h6>Log out</h6>
                  </div>
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="hidden md:flex items-center md:gap-4 gap-2 max-w-[163px] h-10">
          <Link href="/" legacyBehavior passHref>
            <Image src={bellIcon} alt="bell icon" />
          </Link>
          <div className="flex items-center w-[107px] gap-2">
            <Image src={userImage} alt="User" />
            <h6>Kate Cho</h6>
          </div>
        </div>
      </div>
    </NavigationMenu>
  );

  const UnauthenticatedUser = (
    <NavigationMenu className="flex items-center md:h-[100px] h-[48px] border-[1px] border-[#E4E6ED] justify-center w-screen">
      <div className="flex justify-between text-[14px] px-[16px] w-[1120px]">
        <div className="w-full max-w-[768px] flex items-center justify-between">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              <Image
                src={neatlyLogo}
                alt="Neatly Logo"
                className="md:w-[167px] md:h-[45px] w-[94px] h-[25px]"
              />
            </NavigationMenuLink>
          </Link>
          <div className="w-full max-w-[444px] hidden md:flex justify-between">
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
          <Drawer direction="right" className="md:hidden block">
            <DrawerTrigger>
              <MenuIcon className="md:hidden" />
            </DrawerTrigger>
            <DrawerContent className="w-screen mt-12 text-sm leading-4">
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
                <Link href="/" className="mx-4 font-semibold text-[#E76B39]">
                  Log in
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="flex items-center mr-4 min-w-10">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="hidden md:block text-sm leading-4 font-semibold text-[#E76B39]">
              Log in
            </NavigationMenuLink>
          </Link>
        </div>
      </div>
    </NavigationMenu>
  );

  return isUser ? AuthenticatedUser : UnauthenticatedUser;
};

export default NavbarComponent;
