"use client";

import React, { useState } from "react";

const BookingContext = React.createContext();

function BookingContextProvider(props) {
  const [bookingData, setBookingData] = useState();

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {props.children}
    </BookingContext.Provider>
  );
}
const useBookingContext = () => React.useContext(BookingContext);

export { BookingContextProvider, useBookingContext };
