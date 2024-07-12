import React, { useEffect, useState } from "react";
import neatlyIcon from "../../assets/Navigation/neatlyLogo.png";

const Main = () => {
  const [hotelData, setHotelData] = useState({
    name: "Neatly Hotel",
    description:
      "Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation with an outdoor pool, kids' club, sports facilities and a fitness centre. There is also a spa, an indoor pool and saunas. All units at the hotel are equipped with a seating area, a flat-screen TV with satellite channels, a dining area and a private bathroom with free toiletries, a bathtub and a hairdryer. Every room in Neatly Hotel features a furnished balcony. Some rooms are equipped with a coffee machine. Free WiFi and entertainment facilities are available at property and also rentals are provided to explore the area.",
    logo: neatlyIcon,
  });
  const handleHotelName = (e) => {
    let newHotelData = { ...hotelData };
    newHotelData.name = e.target.value;
    setHotelData(newHotelData);
  };
  const handleHotelDescription = (e) => {
    let newHotelData = { ...hotelData };
    newHotelData.description = e.target.value;
    setHotelData(newHotelData);
  };
  useEffect(() => {
    console.log(hotelData);
  }, [hotelData]);
  return (
    <main className="w-full bg-[#F6F7FC]">
      <section className="flex justify-between items-center px-[60px] py-[25px] bg-white h-[80px]">
        <h1 className="text-xl font-semibold">Hotel Information</h1>
        <button className="bg-[#C14817] text-white h-12 px-8 rounded">
          Update
        </button>
      </section>
      <section>
        <form
          action=""
          className="bg-white mx-[60px] my-10 py-10 px-[80px] rounded flex flex-col gap-10"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="">Hotel name *</label>
            <input
              type="text"
              value={hotelData.name}
              className="border-[1px] border-[#D6D9E4] py-[6px] px-3 rounded"
              onChange={handleHotelName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Hotel description *</label>
            <textarea
              type="text"
              value={hotelData.description}
              rows={6}
              className="border-[1px] border-[#D6D9E4] py-[6px] px-3 rounded resize-y"
              onChange={handleHotelDescription}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Hotel logo *</label>
            <input
              type="file"
              className="border-[1px] border-[#D6D9E4] py-[6px] px-3 rounded resize-none"
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default Main;
