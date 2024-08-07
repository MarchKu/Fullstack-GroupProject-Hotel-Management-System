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
      className="w-full max-w-[1440px] px-4 py-10 bg-green-700 flex flex-col gap-10 justify-between items-start text-center text-white"
      id="service"
    >
      <h2 className="w-full h-[30%] text-center content-center md:h-[50%] font-heading lg:text-[6rem] leading-[55px] text-[44px] md:text-[68px] md:leading-[85px]">
        Service & Facilities{" "}
      </h2>

      <div className="w-full font-body flex flex-wrap gap-4 justify-center items-center md:flex-nowrap md:flex-row md:justify-between text-[1.25rem]">
        <div className="w-[144px] md:h-full flex flex-col justify-center items-center">
          <Image src={spa} className="size-20" />
          <p className="w-[144px] md:h-[30%] md:w-full">Spa</p>
        </div>
        <div className="w-[144px] md:h-full flex flex-col justify-center items-center">
          <Image src={sauna} className="size-20" />
          <p className="w-[144px] md:h-[30%] md:w-full">Sauna</p>
        </div>
        <div className="w-[144px]  md:h-full flex flex-col justify-center items-center">
          <Image src={fitness} className="size-20" />
          <p className="md:h-[30%] md:w-full">Fitness</p>
        </div>
        <div className="w-[144px]  md:h-full flex flex-col justify-center items-center">
          <Image src={lounge} className="size-20" />
          <p className="md:h-[30%] md:w-full">Arrival Lougn</p>
        </div>
        <div className="w-[144px]  md:h-full flex flex-col justify-center items-center">
          <Image src={wifi} className="size-20" />
          <p className="w-[144px]  md:h-[30%] md:w-full">Free Wifi</p>
        </div>
        <div className="w-[144px]  md:h-full flex flex-col justify-center items-center">
          <Image src={parking} className="size-20" />
          <p className="md:h-[30%] md:w-full">Parking</p>
        </div>
        <div className="w-[144px] md:h-full flex flex-col justify-center items-center">
          <Image src={operation} className="size-20" />
          <p className="md:h-[30%] md:w-full">24 hours operation</p>
        </div>
      </div>
    </section>
  );
};

export default Service;
