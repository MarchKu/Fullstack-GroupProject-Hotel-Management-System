import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";

const CheckDateBeforeModifie = (props) => {
  const router = useRouter();
  const [isOverAday, setIsoverAday] = useState(true);
  const [isAlreadyCheckIn, setIsAlreadyCheckIn] = useState(false);
  let bookingDate = new Date(props.bookingDate);
  let checkInDate = new Date(props.checkInDate);
  let currentDate = new Date();
  const timeleft = Math.floor((currentDate - bookingDate) / (1000 * 60 * 60));
  const timeFromChackIn = Math.floor(
    (checkInDate - currentDate) / (1000 * 60 * 60)
  );
  useEffect(() => {
    if (timeFromChackIn > 0) {
      setIsAlreadyCheckIn(false);
    } else {
      setIsAlreadyCheckIn(true);
    }

    if (timeleft <= 24) {
      setIsoverAday(false);
    } else {
      setIsoverAday(true);
    }
  }, []);

  const cancleClick = () => {
    timeleft <= 24 ? setIsoverAday(false) : setIsoverAday(true);
  };
  return !isAlreadyCheckIn && !isOverAday && props.bookingStatus !== "cancelled" ? (
    <div className="h-[10%] w-full flex flex-col md:flex-row justify-between items-center md:pl-[5%]">
      <button
        className="order-last w-full text-right md:w-[40%] md:text-left md:order-first pt-[1rem] md:pt-0 "
        onClick={() => cancleClick()}
      >
        <Dialog>
          <DialogTrigger className="text-orange-500 hover:underline">
            Cancel Booking
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="pb-[1rem]">Cancel Booking</DialogTitle>
              <DialogDescription className="pb-[1rem]">
                Are you sure you would like to cancel this booking?
              </DialogDescription>
              <DialogFooter className="flex flex-col md:flex-row w-full gap-[1rem]">
                <button
                  onClick={() => {
                    router.push(`/booking/refund-booking/${props.bookingID}`);
                  }}
                >
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 w-full"
                  >
                    Yes, I want to cancel and request refund
                  </Button>
                </button>
                <DialogClose asChild>
                  <Button type="button">No, Don’t Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </button>

      <div className="h-full flex justify-center md:justify-end items-center w-full md:w-[50%] gap-[1.5rem]">
        <button
          onClick={() => {
            const roomID = history.room_id;
            router.push(`/rooms/${props.roomID}`);
          }}
          className="text-orange-500 hover:underline w-[50%] md:w-auto"
        >
          Room Deatail
        </button>
        <Button className="xl:w-[180px] rounded md:h-full w-[50%]">
          <Link href={`/booking/change-date/${props.bookingID}`}>
            Change date
          </Link>
        </Button>
      </div>
    </div>
  ) : props.bookingStatus !== "cancelled" && !isAlreadyCheckIn && isOverAday && (
    <div className="h-[10%] w-full flex flex-col md:flex-row justify-between items-center md:pl-[5%]">
      <button
        className="order-last w-full text-right md:w-[40%] md:text-left md:order-first pt-[1rem] md:pt-0 "
        onClick={() => cancleClick()}
      >
        <Dialog>
          <DialogTrigger className="text-orange-500 hover:underline">
            Cancel Booking
          </DialogTrigger>
          <DialogContent className="w-screen">
            <DialogHeader>
              <DialogTitle className="pb-[1rem]">Cancel Booking</DialogTitle>
              <DialogDescription className="pb-[1rem]">
                Cancellation of the booking now will not be able to request a
                refund. Are you sure you would like to cancel this booking?
              </DialogDescription>
              <DialogFooter className="flex flex-col md:flex-row w-full gap-[1rem]">
                <button
                  onClick={() => {
                    router.push(`/booking/cancel-booking/${props.bookingID}`);
                  }}
                >
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 w-full"
                  >
                    Yes, I want to cancel
                  </Button>
                </button>
                <DialogClose asChild>
                  <Button type="button">No, Don’t Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </button>

      <div className="h-full flex justify-center md:justify-end items-center w-full md:w-[50%] gap-[1.5rem]">
        <button
          onClick={() => {
            router.push(`/rooms/${props.bookingID}`);
          }}
          className="text-orange-500 hover:underline w-[50%] md:w-auto"
        >
          Room Deatail
        </button>
      </div>
    </div>
  )
};

export default CheckDateBeforeModifie;
