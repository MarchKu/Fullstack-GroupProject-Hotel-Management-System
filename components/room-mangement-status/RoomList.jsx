import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import PostStatus from "./postStatus";
import Loading from "./Loading";
import Image from "next/image";

const room_per_page = 10;

export default function RoomList({ search }) {
  const [roomData, setRoomData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchRoomData = useCallback(
    async (page) => {
      try {
        setIsLoading(true);
        const result = await axios.get(
          `https://neatly-hotel.vercel.app/api/getRoomStatus-Admin?page=${page}&limit=${room_per_page}&search=${search}`
        );
        const fetchedRooms = result.data.rooms;
        const totalRooms = result.data.total;
        const calculatedTotalPages = Math.ceil(totalRooms / room_per_page);

        setRoomData(fetchedRooms);
        setTotalPages(calculatedTotalPages);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
      }
    },
    [search]
  );

  useEffect(() => {
    fetchRoomData(currentPage);
    setStartPage(Math.floor((currentPage - 1) / 5) * 5 + 1);
  }, [currentPage, search, fetchRoomData]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    if (page >= startPage + 4) {
      setStartPage(startPage + 5);
    } else if (page < startPage) {
      setStartPage(startPage - 5);
    }
  };

  const handleNextPage = () => {
    if (currentPage <= totalPages) {
      setStartPage(startPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setStartPage(startPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageNumberButton = () => {
    const pageNumber = [];

    for (let i = startPage; i < startPage + 5 && i <= totalPages; i++) {
      const buttonClassCurrent = `bg-white border-[1px] border-[#D5DFDA] rounded-sm py-1 text-sm px-2`;
      const buttonClassNone = `  rounded-sm py-1 text-sm px-2`;
      pageNumber.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`${
            i === currentPage ? buttonClassCurrent : buttonClassNone
          } ${i === currentPage ? "text-[#5D7B6A]" : "text-[#C8CCDB]"}`}
        >
          {i}
        </button>
      );
    }

    return pageNumber;
  };

  return (
    <div>
      {isLoading ? (
        <Loading
          columns={7}
          colWidths={[
            "w-14 h-6",
            "w-14 h-6",
            "",
            "w-12 h-6",
            "",
            "w-10 h-6",
            "",
          ]}
          colSpan={["", "col-span-2", "", "col-span-2", "", "col-span-2", ""]}
        />
      ) : isError ? (
        <p>Error</p>
      ) : (
        <div>
          {roomData.map((room) => (
            <PostStatus
              key={room.room_id}
              roomNumber={room.room_id}
              typeBed={room.bed_type}
              typeRoom={room.type_name}
              status={room.status}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center m-6 gap-5">
        {startPage === 1 && (
          <button>
            <Image
              className="transform rotate-180 opacity-20"
              src="/img/next.svg"
              alt="Previous page"
              width={16}
              height={16}
            />
          </button>
        )}
        {startPage > 1 && (
          <button onClick={handlePrevPage}>
            <Image
              className="transform rotate-180"
              src="/img/next.svg"
              alt="Previous page"
              width={16}
              height={16}
            />
          </button>
        )}
        {renderPageNumberButton()}
        {startPage + 4 < totalPages && (
          <button onClick={handleNextPage}>
            <Image src="/img/next.svg" alt="Next page" width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  );
}
