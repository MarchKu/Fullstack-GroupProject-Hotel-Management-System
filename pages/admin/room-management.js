import React, { useState } from "react";
import Sidebar from "@/components/hotel-information/Sidebar";
import NavbarRoom from "@/components/navigation-admin/NavbarRoom";
import RoomList from "@/components/room-mangement-status/roomList";
export default function RoomManagement() {
  const [search, setSearch] = useState("");
  return (
    <div className=" w-screen h-screen flex">
      <Sidebar />
      <div className=" bg-[#F6F7FC] w-full h-full flex flex-col">
        <NavbarRoom title={"Room Management"} setSearch={setSearch} />
        <div className=" p-14">
          <div className=" h-10 grid grid-cols-7 font-body text-sm font-medium tracking-tighter text-[#424C6B]">
            <div className="bg-[#E4E6ED] pl-5 flex justify-between items-center ">
              Room no.
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center col-span-2">
              Room type
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center col-span-2">
              Bed type
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center col-span-2">
              Status
            </div>
          </div>
          <RoomList search={search} />
        </div>
      </div>
    </div>
  );
}
