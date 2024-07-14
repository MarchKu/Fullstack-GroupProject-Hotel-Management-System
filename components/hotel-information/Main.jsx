"use client";
import React, { useEffect, useState } from "react";
import neatlyIcon from "../../assets/Navigation/neatlyLogo.png";
import Image from "next/image";
import axios from "axios";

const Main = () => {
  const [hotelData, setHotelData] = useState({});
  useEffect(() => {
    const getHotelData = async () => {
      const result = await axios.get("http://localhost:3000/api/getHotelData");
      // console.log("result: ", result.data.data);
      await setHotelData({
        ...result.data.data,
      });
    };
    getHotelData();
    console.log(hotelData);
  }, []);

  const updateHotelData = async (data) => {
    try {
      await axios.post(
        "http://localhost:3000/api/updateHotelProperties",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleHotelName = (e) => {
    let newHotelData = { ...hotelData };
    newHotelData.hotel_name = e.target.value;
    setHotelData(newHotelData);
  };
  const handleHotelDescription = (e) => {
    let newHotelData = { ...hotelData };
    newHotelData.hotel_description = e.target.value;
    setHotelData(newHotelData);
  };


  return (
    <form className="w-full bg-[#F6F7FC]">
      <section className="flex justify-between items-center px-[60px] py-[25px] bg-white h-[80px]">
        <h1 className="text-xl font-semibold">Hotel Information</h1>
        <button className="bg-[#C14817] text-white h-12 px-8 rounded">
          Update
        </button>
      </section>
      <section className="bg-white mx-[60px] my-10 py-10 px-[80px] rounded flex flex-col gap-10">
        
          <div className="flex flex-col gap-1">
            <label htmlFor="">Hotel name *</label>
            <input
              type="text"
              value={hotelData.hotel_name}
              className="border-[1px] border-[#D6D9E4] py-[6px] px-3 rounded"
              onChange={handleHotelName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Hotel description *</label>
            <textarea
              type="text"
              value={hotelData.hotel_description}
              rows={6}
              className="border-[1px] border-[#D6D9E4] py-[6px] px-3 rounded resize-y"
              onChange={handleHotelDescription}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Hotel logo *</label>
            {hotelData.logo ? (
              <div className="relative w-[167px] h-[167px] flex bg-[#F1F2F6] rounded">
                <Image src={hotelData.logo} className="object-contain" />
                <button className="absolute top-0 right-0 w-6 h-6 pb-[2px] rounded-full bg-[#B61515] text-white flex justify-center items-center">
                  x
                </button>
              </div>
            ) : (
              <input
                type="file"
                className="border-[1px] border-[#D6D9E4] py-[6px] px-3 rounded resize-none"
              />
            )}
          </div>
        
      </section>
    </form>
  );
};

export default Main;
