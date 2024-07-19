import axios from "axios";
import { useState, useEffect } from "react";
import PostStatus from "./postStatus";

const room_per_page = 10;

export default function RoomList() {
  const [roomData, setRoomData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    fetchRoomData(currentPage);
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
    }
  };

  const handlePrevPage = () => {
    if (startPage > 1) {
      setStartPage(startPage - 1);
    }
  };

  const renderPageNumberButton = () => {
    const pageNumber = [];
    for (let i = startPage; i < startPage + 5 && i <= totalPages; i++) {
      pageNumber.push(
        <button
          key={i}
          onClick={() => handlePageCLick(i)}
          disabled={i === currentPage}
          className={`mr-2 bg-${i === currentPage ? "[#FFFFFF]" : "gray"} 
          border-[1px] border-${i === currentPage ? "[#D5DFDA]" : "none"} 
          rounded-${i === currentPage ? "sm" : "none"}
          p-${i === currentPage ? "1" : "none"}
          px-${i === currentPage ? "2" : "none"}
          text-sm `}
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
            <PostStatus
              key={room.id}
              roomNumber={room.room_id}
              typeBed={room.bed_type}
              typeRoom={room.type_name}
              status={room.status}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center m-6">
        {startPage > 1 && <button onClick={handlePrevPage}>{"<"}</button>}
        {renderPageNumberButton()}
        {startPage + 4 < totalPages && (
          <button onClick={handleNextPage}>{">"}</button>
        )}
      </div>
    </div>
  );
}
