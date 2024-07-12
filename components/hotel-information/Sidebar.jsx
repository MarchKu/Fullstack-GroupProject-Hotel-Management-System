"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import neatlyLogo from "../../assets/admin-sidebar/adminNeatlyLogo.png";
import bookingIcon from "../../assets/admin-sidebar/booking.png";
import hotelIcon from "../../assets/admin-sidebar/hotel.png";
import manageIcon from "../../assets/admin-sidebar/manage.png";
import roomIcon from "../../assets/admin-sidebar/room.png";
import logoutIcon from "../../assets/admin-sidebar/logout.png";

const Sidebar = () => {
  const menuLink = [
    {
      title: "Customer Booking",
      icon: bookingIcon,
    },
    {
      title: "Room Management",
      icon: manageIcon,
    },
    {
      title: "Hotel Information",
      icon: hotelIcon,
    },
    {
      title: "Room & Property",
      icon: roomIcon,
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
            <Link
              href={item.title}
              className="flex w-full hover:bg-[#5D7B6A] text-white gap-4 pl-[10%] py-6 items-center"
              key={item.title}
            >
              <Image src={item.icon} width={24} height={24} alt={item.title} />
              <p className="font-medium">{item.title}</p>
            </Link>
          );
        })}
      </section>

      <Link
        href="/logout"
        className="flex w-full hover:bg-[#5D7B6A] text-white gap-4 pl-6 py-6 items-center"
      >
        <Image src={logoutIcon} width={24} height={24} alt="logout icon" />
        <p className="font-medium">Log out</p>
      </Link>
    </aside>
  );
};

export default Sidebar;
