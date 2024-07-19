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
      <button className="bg-[#F0F2F8] rounded-sm p-3 pt-1 pb-1 text-[#006753] text-sm tracking-tighter font-medium">
        Vacant
      </button>
    ),
  },
  {
    value: "occupied",
    button: (
      <button className="bg-[#E4ECFF] rounded-sm p-3 pt-1 pb-1 text-[#084BAF] text-sm tracking-tighter font-medium">
        Occupied
      </button>
    ),
  },
  {
    value: "assign clean",
    button: (
      <button className="bg-[#E5FFFA] rounded-sm p-3 pt-1 pb-1 text-[#006753] text-sm tracking-tighter font-medium">
        Assign Clean
      </button>
    ),
  },
  {
    value: "assign dirty",
    button: (
      <button className="bg-[#FFE5E5] rounded-sm p-3 pt-1 pb-1 text-[#A50606] text-sm tracking-tighter font-medium">
        Assign Dirty
      </button>
    ),
  },
  {
    value: "vacant clean",
    button: (
      <button className="bg-[#E5FFFA] rounded-sm p-3 pt-1 pb-1 text-[#006753] text-sm tracking-tighter font-medium">
        Vacant Clean
      </button>
    ),
  },
  {
    value: "vacant clean inspected",
    button: (
      <button className="bg-[#FFF9E5] rounded-sm p-3 pt-1 pb-1 text-[#766A00] text-sm tracking-tighter font-medium">
        Vacant Clean Inspected
      </button>
    ),
  },
  {
    value: "vacant clean pick up",
    button: (
      <button className="bg-[#E5FFFA] rounded-sm p-3 pt-1 pb-1 text-[#006753] text-sm tracking-tighter font-medium">
        Vacant Clean Pick Up
      </button>
    ),
  },
  {
    value: "occupied clean",
    button: (
      <button className="bg-[#E4ECFF] rounded-sm p-3 pt-1 pb-1 text-[#084BAF] text-sm tracking-tighter font-medium">
        Occupied Clean
      </button>
    ),
  },
  {
    value: "Occupied clean inspected",
    button: (
      <button className="bg-[#FFF9E5] rounded-sm p-3 pt-1 pb-1 text-[#766A00] text-sm tracking-tighter font-medium">
        Occupied Clean Inspected
      </button>
    ),
  },
  {
    value: "occupied dirty",
    button: (
      <button className="bg-[#FFE5E5] rounded-sm p-3 pt-1 pb-1 text-[#A50606] text-sm tracking-tighter font-medium">
        Occupied Dirty
      </button>
    ),
  },
  {
    value: "out of order",
    button: (
      <button className="bg-[#F0F1F8] rounded-sm p-3 pt-1 pb-1 text-[#6E7288] text-sm tracking-tighter font-medium">
        Out of Order
      </button>
    ),
  },
  {
    value: "out of service",
    button: (
      <button className="bg-[#F0F1F8] rounded-sm p-3 pt-1 pb-1 text-[#6E7288] text-sm tracking-tighter font-medium">
        Out of Service
      </button>
    ),
  },
  {
    value: "out of inventory",
    button: (
      <button className="bg-[#F0F1F8] rounded-sm p-3 pt-1 pb-1 text-[#6E7288] text-sm tracking-tighter font-medium">
        Out of Inventory
      </button>
    ),
  },
];

function ComboBoxCheckStatusResponsive({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    const initialStatus = statuses.find((s) => s.value === status);
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
      className="bg-[#FFFFFF] w-full h-16 grid grid-cols-7 font-body text-sm font-normal tracking-tighter text-[#000000]
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
      <div className="  pl-5 flex justify-between items-center col-span-2">
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
