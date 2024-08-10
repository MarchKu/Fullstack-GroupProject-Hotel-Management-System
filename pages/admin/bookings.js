import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Sidebar from "@/components/hotel-information/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { dateFormatter } from "@/hooks/useDateFormatter";
import Loading from "@/components/room-mangement-status/Loading";

export default function AllBooking() {
  const [bookingData, setBookingData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(null);
  const [input, setInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getBookingData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://neatly-hotel.vercel.app/api/booking/bookings",
        {
          full_name: input,
        }
      );
      setBookingData(res.data.data);
      setSize(res.data.size);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    }
  };

  const paginationPage = () => {
    let pageArr = [];
    for (let i = 1; i <= Math.ceil(size / 10); i++) {
      pageArr.push(i);
    }

    return (
      <>
        {pageArr.map((pageNum) => (
          <PaginationLink
            className={`${
              pageNum == page ? "border-gray-400 border-[1px] text-black" : ""
            }`}
            href="#"
            key={pageNum}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </PaginationLink>
        ))}
      </>
    );
  };

  useEffect(() => {
    getBookingData();
  }, []);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-full bg-gray-100">
        <header className="flex flex-row justify-between items-center mt-5 mx-16">
          <h1 className="text-xl font-semibold">Customer Booking</h1>
          <label htmlFor="search"></label>
          <div className="flex flex-row">
            <svg
              className="relative left-10 top-2"
              width="25"
              height="25"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.79844 2.20004C7.04801 2.20004 5.36927 2.8954 4.13153 4.13314C2.89379 5.37088 2.19844 7.04962 2.19844 8.80004C2.19844 10.5505 2.89379 12.2292 4.13153 13.4669C5.36927 14.7047 7.04801 15.4 8.79844 15.4C10.5489 15.4 12.2276 14.7047 13.4653 13.4669C14.7031 12.2292 15.3984 10.5505 15.3984 8.80004C15.3984 7.04962 14.7031 5.37088 13.4653 4.13314C12.2276 2.8954 10.5489 2.20004 8.79844 2.20004ZM0.398438 8.80004C0.398551 7.45685 0.720772 6.13326 1.33807 4.94032C1.95537 3.74737 2.84975 2.71986 3.94618 1.94396C5.04261 1.16806 6.30912 0.666412 7.63947 0.481089C8.96982 0.295766 10.3252 0.432174 11.592 0.878871C12.8587 1.32557 13.9999 2.06953 14.9197 3.04834C15.8395 4.02716 16.5112 5.21229 16.8784 6.50431C17.2456 7.79634 17.2977 9.15759 17.0301 10.4739C16.7626 11.7902 16.1833 13.0231 15.3408 14.0692L19.3344 18.064C19.4229 18.1464 19.4938 18.2458 19.543 18.3562C19.5922 18.4666 19.6186 18.5858 19.6207 18.7066C19.6229 18.8275 19.6006 18.9475 19.5554 19.0596C19.5101 19.1716 19.4427 19.2734 19.3573 19.3589C19.2718 19.4444 19.17 19.5117 19.058 19.557C18.9459 19.6023 18.8259 19.6245 18.705 19.6224C18.5842 19.6202 18.465 19.5938 18.3546 19.5446C18.2442 19.4954 18.1448 19.4245 18.0624 19.336L14.0676 15.3424C12.8335 16.3365 11.3433 16.9612 9.76925 17.1443C8.19517 17.3275 6.60138 17.0616 5.17198 16.3775C3.74257 15.6933 2.53584 14.6188 1.69117 13.278C0.846493 11.9371 0.39833 10.3847 0.398438 8.80004Z"
                fill="#646D89"
              />
            </svg>
            <Input
              className="search-box w-80 pl-12"
              placeholder="Search by customer name"
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
        </header>
        <div className="bookings-table mt-12 mb-5 mx-5">
          <Table>
            <TableHeader className="bg-gray-300 text-sm leading-2">
              <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-nowrap">Customer name</TableHead>
                <TableHead>Guest(s)</TableHead>
                <TableHead>Room type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Bed type</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan={8}>
                    <Loading
                      columns={8}
                      colWidths={[
                        "w-16 h-6",
                        "w-16 h-6",
                        "w-16 h-6",
                        "w-16 h-6",
                        "w-16 h-6",
                        "w-16 h-6",
                        "w-16 h-6",
                        "w-16 h-6",
                      ]}
                      height="h-20"
                    />
                  </td>
                </tr>
              </tbody>
            ) : isError ? (
              <p>Error</p>
            ) : (
              bookingData
                .filter(
                  (item, index) => index >= page * 10 - 10 && index < page * 10
                )
                .map((item, index) => {
                  return (
                    <>
                      <TableBody className="bg-white leading-2">
                        <TableRow key={index}>
                          <TableCell>
                            <a
                              href={`/admin/booking-detail/${item.booking_id}`}
                            >
                              <p className="text-center">{item.booking_id}</p>
                            </a>
                          </TableCell>
                          <TableCell className="max-w-[15ch] truncate">
                            {item.full_name}
                          </TableCell>
                          <TableCell>{item.room_capacity}</TableCell>
                          <TableCell className="truncate">
                            {item.type_name}
                          </TableCell>
                          <TableCell>{item.amount_booking}</TableCell>
                          <TableCell>{item.bed_type}</TableCell>
                          <TableCell className="truncate">
                            {dateFormatter(item.check_in)}
                          </TableCell>
                          <TableCell className="truncate">
                            {dateFormatter(item.check_out)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  );
                })
            )}
          </Table>
        </div>
        <div className="bookings-pagination text-gray-500">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={`${page == 1 ? "hidden" : ""}`}
                  href="#"
                  onClick={() => {
                    if (page !== 1) {
                      setPage(page - 1);
                    } else {
                      setPage(page);
                    }
                  }}
                />
              </PaginationItem>
              <PaginationItem>{paginationPage()}</PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={`${page == Math.ceil(size / 10) ? "hidden" : ""}`}
                  href="#"
                  onClick={() => {
                    if (page !== Math.ceil(size / 10)) {
                      setPage(page + 1);
                    } else {
                      setPage(page);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
