import React from "react";
import Image from "next/image";
import spa from "../../assets/service/spa.png";
import sauna from "../../assets/service/sauna.png";
import fitness from "../../assets/service/fitness.png";
import lounge from "../../assets/service/lounge.png";
import wifi from "../../assets/service/wifi.png";
import parking from "../../assets/service/parking.png";
import operation from "../../assets/service/operation.png";

const Service = () => {
  console.log(spa.displayImage);
  return (
    <section
      className="w-full px-4 py-10 bg-green-700 flex flex-col gap-10 justify-start items-center text-center text-white"
      id="service"
    >
      <h2 className="w-full h-[30%] text-center content-center md:h-[50%] font-heading lg:text-[6rem] leading-[55px] text-[44px] md:text-[68px] md:leading-[85px]">
        Service & Facilities{" "}
      </h2>

      <div className="w-full max-w-[1440px] font-body flex flex-wrap gap-4 justify-center items-center text-[1.25rem]">
        <div className="w-[144px] flex flex-col items-center gap-[19px]">
          <Image src={spa} className="w-[60px]" />
          <p className="w-[144px]  md:w-full">Spa</p>
        </div>
        <div className="w-[144px] flex flex-col items-center gap-[19px]">
          <Image src={sauna} className="w-[60px]" />
          <p className="w-full">Sauna</p>
        </div>
        <div className="w-[144px]  flex flex-col items-center gap-[19px]">
          <Image src={fitness} className="w-[60px]" />
          <p className=" md:w-full">Fitness</p>
        </div>
        <div className="w-[144px]  flex flex-col items-center gap-[19px]">
          <Image src={lounge} className="w-[60px]" />
          <p className=" md:w-full">Arrival Lounge</p>
        </div>
        <div className="w-[144px]  flex flex-col items-center gap-[19px]">
          <Image src={wifi} className="w-[60px]" />
          <p className="w-[144px]   md:w-full">Free Wifi</p>
        </div>
        <div className="w-[144px]  flex flex-col items-center gap-[19px]">
          <Image src={parking} className="w-[60px]" />
          <p className=" md:w-full">Parking</p>
        </div>
        <div className="w-[144px] flex flex-col items-center gap-[19px]">
          <Image src={operation} className="w-[60px]" />
          <p className=" md:w-full">24 hours operation</p>
        </div>
      </div>
    </section>
  );
};

export default Service;
