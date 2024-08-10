import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useBookingContext } from "@/contexts/booking";
import { useRouter } from "next/router";

const AlertRoomIsBooked = () => {
  const { isRoomBooked, setIsRoomBooked } = useBookingContext();
  const [alertOpen, setAlertOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isRoomBooked) {
      setAlertOpen(true);
    }
  }, [isRoomBooked]);

  const redirectToSearchResult = () => {
    const searchQuery = localStorage.getItem("searchData");
    if (searchQuery) {
      const parsedData = JSON.parse(searchQuery);
      router.push({
        pathname: "/search-result",
        query: parsedData,
      });
    }
  };

  const handleAction = () => {
    setAlertOpen(false);
    setIsRoomBooked(false);
    redirectToSearchResult();
  };

  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Room Unavailable</AlertDialogTitle>
          <AlertDialogDescription>
            Sorry, this room is already booked for the selected dates. Please
            choose another room or adjust your dates.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="w-full flex justify-center">
            <AlertDialogAction
              onClick={handleAction}
              className="w-[100px] font-body text-base"
            >
              Ok
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertRoomIsBooked;
