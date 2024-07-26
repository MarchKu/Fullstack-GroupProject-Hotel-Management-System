import * as React from "react";

export default function PostRoomProperty({
  image,
  typeRoom,
  price_per_night,
  promotion_price,
  guest,
  typeBed,
  sizeRoom,
}) {
  const formatPriceNumber = (price) => {
    if (price === 0) {
      return "Free";
    }
    if (price < 1000) {
      return price;
    } else if (price < 1000000 && price >= 1000) {
      const wholePartPrice = Math.floor(price);
      const decimalPart = (price % 1).toFixed(2).substring(2);

      return `${Math.floor(wholePartPrice / 1000)},${String(
        wholePartPrice % 1000
      ).padStart(3, "0")}.${decimalPart}`;
    }
  };
  return (
    <div
      className="bg-[#FFFFFF]   grid grid-cols-8 font-body text-sm font-normal tracking-tighter text-[#000000]
    border-b-[1px] border-[#E4E6ED] "
    >
      <div className="pl-2 flex justify-between items-center">
        <img
          className=" bg-center bg-cover w-36 h-20   mt-2 mb-2 rounded-md object-cover object-center "
          src={image}
        />
      </div>
      <div className="  pl-5 flex justify-between items-center col-span-2">
        {typeRoom}
      </div>
      <div className="  pl-5 flex justify-between items-center ">
        {formatPriceNumber(price_per_night)}
      </div>
      <div className="  pl-5 flex justify-between items-center ">
        {formatPriceNumber(promotion_price)}
      </div>
      <div className="  pl-10 flex justify-between items-center ">{guest}</div>
      <div className="  pl-5 flex justify-between items-center ">{typeBed}</div>
      <div className="  pl-5 flex justify-between items-center ">
        {sizeRoom}
      </div>
    </div>
  );
}
