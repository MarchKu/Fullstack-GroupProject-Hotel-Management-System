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
    <section className="w-full h-screen min-h-[700px] md:min-h-[500px] md:h-[50vh] px-[5%]  py-[5%] bg-green-700 flex flex-col justify-between items-start text-center text-white">
      <h2 className="w-full h-[20%] text-center content-center md:h-[50%] font-heading text-[4rem] md:text-[5rem] lg:text-[6rem]">
        Service & Facilities{" "}
      </h2>
      <div className="w-full h-[80%] font-body flex flex-wrap justify-start items-center md:h-[80%] md:flex-nowrap md:flex-row md:justify-between text-[1.25rem]">
        <div className="w-[50%] h-[20%] md:h-full md:w-1/7 flex flex-col justify-center items-center">
          <Image src={spa} className="size-20" />
          <p className="md:h-[30%] md:w-full">Spa</p>
        </div>
        <div className="w-[50%] h-[20%] md:h-full md:w-1/7 flex flex-col justify-center items-center">
          <Image src={sauna} className="size-20" />
          <p className="md:h-[30%] md:w-full">Sauna</p>
        </div>
        <div className="w-[50%] h-[20%] md:h-full md:w-1/7 flex flex-col justify-center items-center">
          <Image src={fitness} className="size-20" />
          <p className="md:h-[30%] md:w-full">Fitness</p>
        </div>
        <div className="w-[50%] h-[20%] md:h-full md:w-1/7 flex flex-col justify-center items-center">
          <Image src={lounge} className="size-20" />
          <p className="md:h-[30%] md:w-full">Arrival Lougn</p>
        </div>
        <div className="w-[50%] h-[20%] md:h-full md:w-1/7 flex flex-col justify-center items-center">
          <Image src={wifi} className="size-20" />
          <p className="md:h-[30%] md:w-full">Free Wifi</p>
        </div>
        <div className="w-[50%] h-[20%] md:h-full md:w-1/7 flex flex-col justify-center items-center">
          <Image src={parking} className="size-20" />
          <p className="md:h-[30%] md:w-full">Parking</p>
        </div>
        <div className="w-full h-[20%] md:h-full md:w-1/7 flex flex-col justify-center items-center md:w-[50%]">
          <Image src={operation} className="size-20" />
          <p className="md:h-[30%] md:w-full">24 hours operation</p>
        </div>
      </div>
    </section>
  );
};

export default Service;
