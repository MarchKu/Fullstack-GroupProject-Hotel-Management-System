import React from "react";
import Sidebar from "@/components/hotel-information/Sidebar";
import NavbarRoom from "@/components/navigation-admin/NavbarRoom";
import RoomList from "@/components/room-mangement-status/roomList-property";
export default function roomManagement() {
  return (
    <div className=" w-screen h-screen flex">
      <Sidebar />
      <div className=" bg-[#F6F7FC] w-full h-full flex flex-col">
        <NavbarRoom title={"Room & Property"} />
        <div className=" p-14">
          <div className=" h-10 grid grid-cols-8 font-body text-sm font-medium tracking-tighter text-[#424C6B]">
            <div className="bg-[#E4E6ED] pl-5 flex justify-between items-center ">
              Image
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center col-span-2">
              Room type
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center ">
              Price
            </div>
            <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center ">
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
          <RoomList />
        </div>
      </div>
    </div>
  );
}
