import React, { useEffect } from "react";
import img1 from "../../assets/room&suite/1.png";
import img2 from "../../assets/room&suite/2.png";
import img3 from "../../assets/room&suite/3.png";
import img4 from "../../assets/room&suite/4.png";
import img5 from "../../assets/room&suite/5.png";
import img6 from "../../assets/room&suite/6.png";
import arrow from "../../assets/room&suite/arrow.svg";
import Link from "next/link";

const RoomSuite = () => {
  return (
    <section className="w-full h-[200vh] min-h-[2140px] px-[5%] md:px-[10%] py-[6%] flex flex-col justify-start items-center gap-[2%] md:gap-[4%]" id="room&suite">
      <h2 className="font-heading w-full text-center text-[4rem] md:text-[6rem] text-primary-foreground text-primary-heading ">
        Rooms & Suits
      </h2>
      <div className="w-full h-full flex flex-col gap-[1.5rem]">
        {/* First half */}
        <div className="w-full h-[50%] grid gap-[1.5rem] grid-cols-1 md:grid-cols-5">
          <div
            className="bg-slate-300 md:col-span-5 bg-center bg-cover bg-blend-multiply flex flex-col justify-end p-[5%]"
            style={{ backgroundImage: `url(${img1.src})` }}
          >
            <h3 className="font-heading text-white text-[3rem] md:text-[4rem] ">
              Superior Garden View
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link href="/rooms/1" className="font-body text-white text-[1rem] md:text-[1.5rem] hover:underline">
                Explore Room
                <span><img src={arrow.src} /></span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-3 bg-center bg-cover bg-blend-multiply flex flex-col justify-end p-[5%]"
            style={{ backgroundImage: `url(${img2.src})` }}
          >
            <h3 className="font-heading text-white text-[3rem] md:text-[4rem]">
              Deluxe
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link href="/rooms/2" className="font-body text-white text-[1rem] md:text-[1.5rem] hover:underline">
                Explore Room
                <span><img src={arrow.src} /></span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-2 bg-center bg-cover bg-blend-multiply flex flex-col justify-end p-[5%]"
            style={{ backgroundImage: `url(${img3.src})` }}
          >
            <h3 className="font-heading text-white text-[3rem] md:text-[4rem]">
              Superior
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link href="/rooms/3" className="font-body text-white text-[1rem] md:text-[1.5rem] hover:underline">
                Explore Room
                <span><img src={arrow.src} /></span>
              </Link>
            </div>
          </div>
        </div>
        {/* Second half */}
        <div className="w-full h-[50%] grid gap-[1.5rem] grid-cols-1 md:grid-cols-7">
          <div
            className="bg-slate-300 md:row-span-2 md:col-span-3 bg-center bg-cover bg-blend-multiply flex flex-col justify-end p-[5%]"
            style={{ backgroundImage: `url(${img4.src})` }}
          >
            <h3 className="font-heading text-white text-[3rem] md:text-[4rem]">
              Premier Sea View
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link href="/rooms/4" className="font-body text-white text-[1rem] md:text-[1.5rem] hover:underline">
                Explore Room
                <span><img src={arrow.src} /></span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-4 bg-center bg-cover bg-blend-multiply flex flex-col justify-end p-[5%]"
            style={{ backgroundImage: `url(${img5.src})` }}
          >
            <h3 className="font-heading text-white text-[3rem] md:text-[4rem]">
              Supreme
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link href="/rooms/5" className="font-body text-white text-[1rem] md:text-[1.5rem] hover:underline">
                Explore Room
                <span><img src={arrow.src} /></span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-4 bg-center bg-cover bg-blend-multiply flex flex-col justify-end p-[5%]"
            style={{ backgroundImage: `url(${img6.src})` }}
          >
            <h3 className="font-heading text-white text-[3rem] md:text-[4rem]">
              Suite
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link href="/rooms/6" className="font-body text-white text-[1rem] md:text-[1.5rem] hover:underline">
                Explore Room
                <span><img src={arrow.src} /></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default RoomSuite;
