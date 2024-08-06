"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import neatlyLogo from "../../assets/admin-sidebar/adminNeatlyLogo.png";
import bookingIcon from "../../assets/admin-sidebar/booking.png";
import hotelIcon from "../../assets/admin-sidebar/hotel.png";
import manageIcon from "../../assets/admin-sidebar/manage.png";
import roomIcon from "../../assets/admin-sidebar/room.png";
import logoutIcon from "../../assets/admin-sidebar/logout.png";
import { useAuth } from "@/contexts/authentication";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { adminLogout } = useAuth();

  const pathName = usePathname();

  const menuLink = [
    {
      title: "Customer Booking",
      icon: bookingIcon,
      url: "/admin/bookings",
    },
    {
      title: "Room Management",
      icon: manageIcon,
      url: "/admin/room-management",
    },
    {
      title: "Hotel Information",
      icon: hotelIcon,
      url: "/admin/hotel-information",
    },
    {
      title: "Room & Property",
      icon: roomIcon,
      url: "/admin/room-property-all",
    },
  ];

  return (
    <aside className="w-[17%] min-w-[240px] h-full min-h-screen bg-[#2F3E35] flex flex-col gap-10">
      <section id="top-header" className="py-10">
        <Image src={neatlyLogo} className="mx-auto mb-4" />
        <h2 className="text-[#ABC0B4] text-center">Admin Panel Control</h2>
      </section>
      <section id="menu link wrapper" className="min-h-[540px]">
        {menuLink.map((item) => {
          return (
            <a
              href={item.url}
              className={`${
                item.url === pathName ? "bg-[#5D7B6A]" : ""
              } flex w-full hover:bg-[#5D7B6A] text-white gap-4 pl-[10%] py-6 items-center`}
              key={item.title}
            >
              <Image src={item.icon} width={24} height={24} alt={item.title} />
              <p className="font-medium">{item.title}</p>
            </a>
          );
        })}
      </section>

      <Link
        href=""
        className="flex w-full hover:bg-[#5D7B6A] text-white gap-4 pl-6 py-6 items-center"
      >
        <Image src={logoutIcon} width={24} height={24} alt="logout icon" />
        <p
          className="font-medium"
          onClick={() => {
            document.cookie =
              "adminToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            adminLogout();
          }}
        >
          Log out
        </p>
      </Link>
    </aside>
  );
};

export default Sidebar;
