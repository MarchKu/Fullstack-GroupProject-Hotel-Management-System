import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationMenuLink } from "../ui/navigation-menu";


import neatlyLogo from "../../assets/Navigation/neatlyLogo.png";


const Logo = () => {
  return (
    <Link href="/" legacyBehavior passHref>
      <NavigationMenuLink>
        <Image
          src={neatlyLogo}
          alt="Neatly Logo"
          className="lg:min-w-[167px] lg:h-[45px] md:w-[94px] w-[94px] h-[25px]"
        />
      </NavigationMenuLink>
    </Link>
  );
};

export default Logo;
