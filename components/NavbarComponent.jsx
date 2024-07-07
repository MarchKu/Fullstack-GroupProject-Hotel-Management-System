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
import Bell from "../assets/images/bell.svg";
import userImage from "../assets/images/photo.png";
import profileIcon from "../assets/images/Frame.png";
import cardIcon from "../assets/images/credit.png";
import bookingIcon from "../assets/images/booking.png";
import logoutIcon from "../assets/images/logout.png";
import neatlyMobile from "../assets/images/mobile-logo.png";
import neatlyLogo from "../assets/images/NeatlyLogo.png";
import { useMediaQuery } from "@/hooks/use-media-query.jsx";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { MenuIcon } from "lucide-react";

const NavbarComponent = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isUser = false;

  const AuthenticatedUser = isDesktop ? (
    <NavigationMenu className="flex items-center h-[100px] border-[1px] border-[#E4E6ED] justify-center w-screen">
      <div className="flex justify-between text-[14px] px-[16px] w-[1120px]">
        <div className="w-full max-w-[660px] flex items-center justify-between">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              <Image
                src={neatlyLogo}
                alt="Neatly Logo"
                width={167}
                height={45}
              />
            </NavigationMenuLink>
          </Link>
          <div className="w-full max-w-[444px] flex justify-between">
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
        <div className="flex items-center gap-4 max-w-[163px] h-10">
          <Link href="/" legacyBehavior passHref>
            <Bell />
          </Link>
          <div className="flex items-center w-[107px] gap-2">
            <Image src={userImage} alt="User" />
            <h6>Kate Cho</h6>
          </div>
        </div>
      </div>
    </NavigationMenu>
  ) : (
    <NavigationMenu className="flex items-center h-[48px] border-[1px] border-[#E4E6ED] justify-center w-screen">
      <div className="flex justify-between text-[14px] px-[16px] w-[1120px]">
        <div className="w-full max-w-[660px] flex items-center justify-between">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              <Image
                src={neatlyLogo}
                alt="Neatly Logo"
                width={94}
                height={25}
              />
            </NavigationMenuLink>
          </Link>
          <Drawer direction="right">
            <DrawerTrigger>
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent className="w-screen mt-[48px] text-sm leading-4">
              <div className="mt-6 mx-4">
                <div className="flex items-center w-[107px] gap-2 mb-4">
                  <Image src={userImage}></Image>
                  <h6>Kate Cho</h6>
                </div>

                <MenubarSeparator />

                <Link href="/">
                  <div className="flex items-center w-[343px] gap-3 mx-4 my-4">
                    <Image src={profileIcon}></Image>
                    <h6>Profile</h6>
                  </div>
                </Link>
                <Link href="/">
                  <div className="flex items-center w-[343px] gap-3 mx-4 my-4">
                    <Image src={cardIcon}></Image>
                    <h6>Payment Method</h6>
                  </div>
                </Link>
                <Link href="/">
                  <div className="flex items-center w-[343px] gap-3 mx-4 my-4">
                    <Image src={bookingIcon}></Image>
                    <h6>Booking History</h6>
                  </div>
                </Link>

                <MenubarSeparator />

                <Link href="/">
                  <div className="flex items-center w-[343px] gap-3 mx-4 my-4">
                    <Image src={logoutIcon}></Image>
                    <h6>Log out</h6>
                  </div>
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </NavigationMenu>
  );

  const UnauthenticatedUser = isDesktop ? (
    <NavigationMenu className="flex items-center h-[100px] border-[1px] border-[#E4E6ED] justify-center w-screen">
      <div className="flex justify-between text-[14px] px-[16px] w-[1120px]">
        <div className="w-full max-w-[660px] flex items-center justify-between">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              <Image
                src={neatlyLogo}
                alt="Neatly Logo"
                width={167}
                height={45}
              />
            </NavigationMenuLink>
          </Link>
          <div className="w-full max-w-[444px] flex justify-between">
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
            <NavigationMenuLink className="text-sm leading-4 mr-4 font-semibold text-[#E76B39]">
              Log in
            </NavigationMenuLink>
          </Link>
        </div>
      </div>
    </NavigationMenu>
  ) : (
    <NavigationMenu className="flex items-center h-[48px] border-[1px] border-[#E4E6ED] justify-center w-screen">
      <div className="flex justify-between text-[14px] px-[16px] w-[1120px]">
        <div className="w-full max-w-[660px] flex items-center justify-between">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              <Image
                src={neatlyLogo}
                alt="Neatly Logo"
                width={94}
                height={25}
              />
            </NavigationMenuLink>
          </Link>
          <Drawer direction="right">
            <DrawerTrigger>
              <MenuIcon />
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
      </div>
    </NavigationMenu>
  );

  return isUser ? AuthenticatedUser : UnauthenticatedUser;
};

export default NavbarComponent;
