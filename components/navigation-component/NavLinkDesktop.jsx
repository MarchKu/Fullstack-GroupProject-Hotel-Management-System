import React from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuLink } from "../ui/navigation-menu";

const NavLinkDesktop = () => {
  return (
    <div className="hidden gap-[1rem] md:w-full md:min-w-[585px] md:flex md:pl-[10%]">
      <Link href="/" legacyBehavior passHref>
        <NavigationMenuLink className="px-3">About Neatly</NavigationMenuLink>
      </Link>
      <Link href="/" legacyBehavior passHref>
        <NavigationMenuLink className="px-3">
          Service & Facilities
        </NavigationMenuLink>
      </Link>
      <Link href="/" legacyBehavior passHref>
        <NavigationMenuLink className="px-3">Rooms & Suits</NavigationMenuLink>
      </Link>
    </div>
  );
};

export default NavLinkDesktop;
