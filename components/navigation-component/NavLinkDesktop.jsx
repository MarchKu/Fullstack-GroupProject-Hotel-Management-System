import React from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuLink } from "../ui/navigation-menu";

const NavLinkDesktop = ({ hotelName }) => {
  return (
    <div className="hidden md:flex md:flex-1 gap-3 pt-[2px]">
      <Link href="/#about" legacyBehavior passHref>
        <NavigationMenuLink className="whitespace-nowrap ">
          About {hotelName}
        </NavigationMenuLink>
      </Link>
      <Link href="/#service" legacyBehavior passHref>
        <NavigationMenuLink className="whitespace-nowrap ">
          Service & Facilities
        </NavigationMenuLink>
      </Link>
      <Link href="/#room&suite" legacyBehavior passHref>
        <NavigationMenuLink className="whitespace-nowrap ">
          Rooms & Suits
        </NavigationMenuLink>
      </Link>
    </div>
  );
};

export default NavLinkDesktop;
