import React, { useState } from "react";
import Sidebar from "@/components/hotel-information/Sidebar";
import NavbarRoom from "@/components/navigation-admin/NavbarRoom";
import RoomList from "@/components/room-mangement-status/RoomList-property";
export default function roomManagement() {
  const [search, setSearch] = useState("");
  return (
    <div className=" flex">
      <Sidebar />
      <div className=" bg-[#F6F7FC] md:w-full  flex flex-col pointer-events-none">
        <NavbarRoom title={"Room & Property"} setSearch={setSearch} />
        <div className=" p-14">
          <div className=" h-10 grid grid-cols-8 font-body text-sm font-medium tracking-tighter text-[#424C6B]">
            <div className="bg-[#E4E6ED] pl-14 flex justify-between items-center ">
              Image
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center col-span-2">
              Room type
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center ">
              Price
            </div>
            <div className=" bg-[#E4E6ED] pl-1 flex justify-between items-center ">
              Promotion price
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center ">
              Guest(s)
            </div>

            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center ">
              Bed type
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center ">
              Room Size
            </div>
          </div>
          <RoomList search={search} />
        </div>
      </div>
    </div>
  );
}
