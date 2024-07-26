import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationMenuLink } from "../ui/navigation-menu";

const Logo = ({ hotelLogo }) => {
  return (
    <Link href="/" legacyBehavior passHref>
      <NavigationMenuLink>
        <Image
          src={hotelLogo}
          alt="Neatly Logo"
          width={90}
          height={90}
          // className="lg:min-w-[167px] lg:h-[45px] md:w-[94px] w-[94px] h-[25px]"
          className="lg:w-[90px] md:w-[90px] w-[40px] "
        />
      </NavigationMenuLink>
    </Link>
  );
};

export default Logo;
