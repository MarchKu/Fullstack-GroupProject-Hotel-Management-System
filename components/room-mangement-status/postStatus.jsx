import * as React from "react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area-admin";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/commandRoom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover-admin";
import useUpdateRoomStatus from "@/hooks/update-room-status";
import { useEffect } from "react";

const statuses = [
  {
    value: "vacant",
    button: (
      <div className="hover:cursor-pointer bg-[#F0F2F8] rounded-sm p-3 pt-1 pb-1 text-[#006753] text-sm tracking-tighter font-medium">
        Vacant
      </div>
    ),
  },
  {
    value: "occupied",
    button: (
      <div className=" hover:cursor-pointer bg-[#E4ECFF] rounded-sm p-3 pt-1 pb-1 text-[#084BAF] text-sm tracking-tighter font-medium">
        Occupied
      </div>
    ),
  },
  {
    value: "assign clean",
    button: (
      <div className="hover:cursor-pointer bg-[#E5FFFA] rounded-sm p-3 pt-1 pb-1 text-[#006753] text-sm tracking-tighter font-medium">
        Assign Clean
      </div>
    ),
  },
  {
    value: "assign dirty",
    button: (
      <div className="hover:cursor-pointer bg-[#FFE5E5] rounded-sm p-3 pt-1 pb-1 text-[#A50606] text-sm tracking-tighter font-medium">
        Assign Dirty
      </div>
    ),
  },
  {
    value: "vacant clean",
    button: (
      <div className="hover:cursor-pointer bg-[#E5FFFA] rounded-sm p-3 pt-1 pb-1 text-[#006753] text-sm tracking-tighter font-medium">
        Vacant Clean
      </div>
    ),
  },
  {
    value: "vacant clean inspected",
    button: (
      <div className="hover:cursor-pointer bg-[#FFF9E5] rounded-sm p-3 pt-1 pb-1 text-[#766A00] text-sm tracking-tighter font-medium">
        Vacant Clean Inspected
      </div>
    ),
  },
  {
    value: "vacant clean pick up",
    button: (
      <div className="hover:cursor-pointer bg-[#E5FFFA] rounded-sm p-3 pt-1 pb-1 text-[#006753] text-sm tracking-tighter font-medium">
        Vacant Clean Pick Up
      </div>
    ),
  },
  {
    value: "occupied clean",
    button: (
      <div className="hover:cursor-pointer bg-[#E4ECFF] rounded-sm p-3 pt-1 pb-1 text-[#084BAF] text-sm tracking-tighter font-medium">
        Occupied Clean
      </div>
    ),
  },
  {
    value: "Occupied clean inspected",
    button: (
      <div className="hover:cursor-pointer bg-[#FFF9E5] rounded-sm p-3 pt-1 pb-1 text-[#766A00] text-sm tracking-tighter font-medium">
        Occupied Clean Inspected
      </div>
    ),
  },
  {
    value: "occupied dirty",
    button: (
      <div className=" hover:cursor-pointer bg-[#FFE5E5] rounded-sm p-3 pt-1 pb-1 text-[#A50606] text-sm tracking-tighter font-medium">
        Occupied Dirty
      </div>
    ),
  },
  {
    value: "out of order",
    button: (
      <div className="hover:cursor-pointer bg-[#F0F1F8] rounded-sm p-3 pt-1 pb-1 text-[#6E7288] text-sm tracking-tighter font-medium">
        Out of Order
      </div>
    ),
  },
  {
    value: "out of service",
    button: (
      <div className="hover:cursor-pointer bg-[#F0F1F8] rounded-sm p-3 pt-1 pb-1 text-[#6E7288] text-sm tracking-tighter font-medium">
        Out of Service
      </div>
    ),
  },
  {
    value: "out of inventory",
    button: (
      <div className="hover:cursor-pointer bg-[#F0F1F8] rounded-sm p-3 pt-1 pb-1 text-[#6E7288] text-sm tracking-tighter font-medium">
        Out of Inventory
      </div>
    ),
  },
];

function ComboBoxCheckStatusResponsive({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    const initialStatus = statuses.find(
      (s) => s.value === status.toLowerCase()
    );
    setSelectedStatus(initialStatus);
  }, [status]);

  const handleSelect = (value) => {
    const newStatus = statuses.find((status) => status.value === value);
    setSelectedStatus(newStatus);
    setOpen(false);
    onChange(value);
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className=" justify-start ">
            {selectedStatus ? (
              <>{selectedStatus.button}</>
            ) : (
              <button className="cursor-pointer select-none border-[1px] rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent duration-300">
                {status}
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 m-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Search status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <ScrollArea>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      onSelect={() => handleSelect(status.value)}
                    >
                      <button>{status.button}</button>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function PostStatus({ roomNumber, typeBed, typeRoom, status }) {
  const numberRoom = (roomNumber) => {
    if (roomNumber < 10) {
      return `000${roomNumber}`;
    } else if (roomNumber < 100) {
      return `00${roomNumber}`;
    } else if (roomNumber < 1000) {
      return `0${roomNumber}`;
    } else {
      return `${roomNumber}`;
    }
  };

  const { updateStatus, isLoading, isError } = useUpdateRoomStatus();
  const handleStatusChange = (newStatus) => {
    updateStatus(roomNumber, newStatus);
  };

  return (
    <div
      className="bg-[#FFFFFF] w-full h-14 grid grid-cols-7 font-body text-sm font-normal tracking-tighter text-[#000000]
    border-b-[1px] border-[#E4E6ED] "
    >
      <div className=" pl-5 flex justify-between items-center ">
        {numberRoom(roomNumber)}
      </div>
      <div className="  pl-5 flex justify-between items-center col-span-2">
        {typeRoom}
      </div>
      <div className="  pl-5 flex justify-between items-center col-span-2">
        {typeBed}
      </div>
      <div className="  pl-3 flex justify-between items-center col-span-2">
        <ComboBoxCheckStatusResponsive
          status={status}
          onChange={handleStatusChange}
        />
        {isLoading && <p>Updating...</p>}
        {isError && <p>Error updating status.</p>}
      </div>
    </div>
  );
}
