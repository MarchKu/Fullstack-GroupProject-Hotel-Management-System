import React, { useState, useEffect } from "react";
import Image from "next/image";
import FooterLogo from "../../assets/Footer/FooterLogo.png";
import PhoneIcon from "../../assets/Footer/PhoneIcon.png";
import MailIcon from "../../assets/Footer/MailIcon.png";
import LocationIcon from "../../assets/Footer/LocationIcon.png";
import FacebookIcon from "../../assets/Footer/FacebookIcon.png";
import IgIcon from "../../assets/Footer/IgIcon.png";
import TwitterIcon from "../../assets/Footer/TwitterIcon.png";
import axios from "axios";

const FooterComponent = () => {
  const [hotelData, setHotelData] = useState({});

  useEffect(() => {
    const getHotelData = async () => {
      const result = await axios.get("http://localhost:3000/api/getHotelData");
      setHotelData(result.data.data);
    };

    getHotelData();
  }, []);
  return (
    <footer className="w-full bg-primary-heading font-body text-white flex flex-col items-center px-[4%] py-10 md:pt-[66px] md:pb-0 gap-6 md:gap-[91px]">
      <div className=" flex flex-col md:flex-row gap-6 md:gap-[30%] w-full max-w-[1440px] md:px-[8%]">
        <div className=" flex flex-col justify-start items-start text-[1.2rem] lg:text-[1.5rem] xl:text-[1.7rem] gap-10">
          <Image
            src={hotelData.hotel_logo}
            alt="Neatly Logo"
            className=""
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-xl">{hotelData.hotel_name}</h1>
            <p className="text-base">
              The best hotel for rising your experience
            </p>
          </div>
        </div>

        <div className="w-full md:w-[40%] h-full flex flex-col gap-4 justify-start items-start text-base font-extralight">
          <h1 className="py-4 font-normal">CONTACT</h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-[1.5rem] ">
              <Image
                src={PhoneIcon}
                alt="Phone icon"
                className="w-5 h-5"
                width="auto"
                height="auto"
              />
              <p>+66 99 999 9999</p>
            </div>
            <div className="flex gap-[1.5rem] ">
              <Image
                src={MailIcon}
                alt="Mail icon"
                className="w-5 h-5"
                width="auto"
                height="auto"
              />
              <p>contact@neatlyhotel.com</p>
            </div>
            <div className="flex gap-[1.5rem]">
              <Image
                src={LocationIcon}
                alt="Location icon"
                className="w-5 h-5"
                width="auto"
                height="auto"
              />
              <p>
                188 Phaya Thai Rd, Thung Phaya Thai, Ratchathewi, Bangkok 10400
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full border-t-[1px] border-green-700 pt-6 md:py-10">
        <div className="flex gap-[1rem]">
          <Image
            src={FacebookIcon}
            alt="facebook icon"
            className="md:size-[2rem]"
            width="auto"
            height="auto"
          />
          <Image
            src={IgIcon}
            alt="instragam icon"
            className="md:size-[2rem]"
            width="auto"
            height="auto"
          />
          <Image
            src={TwitterIcon}
            alt="twitter icon"
            className="md:size-[2rem]"
            width="auto"
            height="auto"
          />
        </div>
        <p className="text-green-300 text-sm text-center content-center">
          Copyright ©2022 Neatly Hotel
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
