import axios from "axios";
import { useState, useEffect } from "react";
import PostRoomProperty from "./postRoomProperty";

const room_per_page = 6;

export default function RoomList() {
  const [roomData, setRoomData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    fetchRoomData(currentPage);
    setStartPage(Math.floor((currentPage - 1) / 5) * 5 + 1);
  }, [currentPage]);

  const fetchRoomData = async (page) => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:3000/api/getRoomStatus-Admin?page=${page}&limit=${room_per_page}`
      );
      setRoomData(result.data.rooms);
      setTotalPages(Math.ceil(result.data.total / room_per_page));
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const handlePageCLick = (page) => {
    setCurrentPage(page);
    if (page >= startPage + 4) {
      setStartPage(startPage + 1);
    } else if (page < startPage && startPage > 1) {
      setStartPage(startPage - 1);
    }
  };

  const handleNextPage = () => {
    if (startPage + 5 <= totalPages) {
      setStartPage(startPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (startPage > 1) {
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
          onClick={() => handlePageCLick(i)}
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
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <div>
          {roomData.map((room) => (
            <PostRoomProperty
              key={room.room_id}
              image={room.main_image}
              typeBed={room.bed_type}
              typeRoom={room.type_name}
              price_per_night={room.current_price}
              promotion_price={room.promotion_price}
              guest={room.room_capacity}
              sizeRoom={room.room_size}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center m-6 gap-5">
        {startPage === 1 && (
          <button>
            <img
              className="transform rotate-180 opacity-20"
              src="/img/next.svg"
            />
          </button>
        )}
        {startPage > 1 && (
          <button onClick={handlePrevPage}>
            <img className="transform rotate-180 " src="/img/next.svg" />
          </button>
        )}
        {renderPageNumberButton()}
        {startPage + 4 < totalPages && (
          <button onClick={handleNextPage}>
            <img src="/img/next.svg" />
          </button>
        )}
      </div>
    </div>
  );
}
