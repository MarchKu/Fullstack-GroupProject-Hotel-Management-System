import React from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuLink } from "../ui/navigation-menu";

const NavLinkDesktop = () => {
  return (
    <div className="w-full hidden md:flex md:flex-1 mx-2 gap-3 pt-[2px]">
      <Link href="/#about" legacyBehavior passHref>
        <NavigationMenuLink className="whitespace-nowrap px-3">
          About Neatly
        </NavigationMenuLink>
      </Link>
      <Link href="/#service" legacyBehavior passHref>
        <NavigationMenuLink className="whitespace-nowrap px-3">
          Service & Facilities
        </NavigationMenuLink>
      </Link>
      <Link href="/#room&suite" legacyBehavior passHref>
        <NavigationMenuLink className="whitespace-nowrap px-3">
          Rooms & Suits
        </NavigationMenuLink>
      </Link>
    </div>
  );
};

export default NavLinkDesktop;
