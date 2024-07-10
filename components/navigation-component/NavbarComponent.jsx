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

const NavbarComponent = ({ isAuthenticated }) => {
  const { logout } = useAuth();
  const AuthenticatedUser = (
    <NavigationMenu className="flex items-center md:h-[100px] h-[48px] border-[1px] border-[#E4E6ED] justify-center w-full">
      <div className="flex justify-between text-[14px] px-[16px] w-[1120px]">
        <div className="w-full flex items-center justify-between">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              <Image
                src={neatlyLogo}
                alt="Neatly Logo"
                className="md:w-[167px] md:h-[45px] w-[94px] h-[25px]"
              />
            </NavigationMenuLink>
          </Link>
          <div className="w-full max-w-[444px] justify-between hidden md:flex md:flex-1 mx-2">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="px-3">
                About Neatly
              </NavigationMenuLink>
            </Link>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="px-3">
                Service & Facilities
              </NavigationMenuLink>
            </Link>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="px-3">
                Rooms & Suits
              </NavigationMenuLink>
            </Link>
          </div>
          <div className="flex items-center gap-1 w-[180px] h-10 justify-end">
            <Menubar className="flex rounded-full border-0 p-0">
              <MenubarMenu>
                <MenubarTrigger className="rounded-full p-1">
                  <Image
                    src={bellIcon}
                    alt="bell icon"
                    className="w-6 h-6 md:min-w-10 md:min-h-10"
                  />
                </MenubarTrigger>
                <MenubarContent className="md:w-[370px] md:h-auto w-screen h-screen px-[14px] py-2 md:absolute top-0 right-[-32px] md:right-[-50px]">
                  <MenubarItem className="gap-3 px-0 py-4 flex items-start">
                    <Image src={notiImage} className="w-8 h-8 rounded-full" />
                    <p>
                      Tomorrow is your check-in date with Super Premier View
                      Room
                      <span className="font-semibold">{` ‘Th, 19 Oct 2022’ `}</span>
                      We will wait for your arrival!
                    </p>
                  </MenubarItem>
                  <MenubarItem className="gap-3 px-0 py-4 flex items-start">
                    <Image src={notiImage} className="w-8 h-8 rounded-full" />
                    <p>
                      Tomorrow is your check-in date with Super Premier View
                      Room
                      <span className="font-semibold">{` ‘Th, 19 Oct 2022’ `}</span>
                      We will wait for your arrival!
                    </p>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <Drawer direction="right" className="md:hidden flex">
              <DrawerTrigger>
                <MenuIcon className="md:hidden w-6 h-6" />
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
            <Menubar className="hidden md:flex rounded-full border-0 ">
              <MenubarMenu>
                <MenubarTrigger className="rounded-full p-2">
                  <div className="hidden md:flex items-center w-[107px] gap-2">
                    <Image src={userImage} alt="User" className="w-10 h-10" />
                    <h6 className="min-w-[59px]">Kate Cho</h6>
                  </div>
                </MenubarTrigger>
                <MenubarContent className="w-[198px] px-[14px] py-2 md:mx-4">
                  <MenubarItem className="gap-3 px-0 py-2">
                    <Image src={profileIcon} className="w-4 h-4" />
                    <p>Profile</p>
                  </MenubarItem>
                  <MenubarItem className="gap-3 px-0">
                    <Image src={cardIcon} className="w-4 h-4" />
                    <p>Payment Method</p>
                  </MenubarItem>
                  <MenubarItem className="gap-3 px-0">
                    <Image src={bookingIcon} className="w-4 h-4" />
                    <p>Booking History</p>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="gap-3 px-0" onClick={logout}>
                    <Image src={logoutIcon} />
                    <p>Log out</p>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            {/* <div className="hidden md:flex items-center w-[107px] gap-2">
              <Image src={userImage} alt="User" className="w-10 h-10"/>
              <h6 className="min-w-[59px]">Kate Cho</h6>
            </div> */}
          </div>
        </div>
      </div>
    </NavigationMenu>
  );

  const UnauthenticatedUser = (
    <NavigationMenu className="flex items-center md:h-[100px] h-[48px] border-[1px] border-[#E4E6ED] justify-center w-full">
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
        <div className="hidden md:flex items-center mr-4 min-w-10">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="text-sm leading-4 font-semibold text-[#E76B39]">
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
