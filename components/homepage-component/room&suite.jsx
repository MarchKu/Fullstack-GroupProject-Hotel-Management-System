import React from "react";
import img1 from "../../asset/room&suit/1.png";
import img2 from "../../asset/room&suit/2.png";
import img3 from "../../asset/room&suit/3.png";
import img4 from "../../asset/room&suit/4.png";
import img5 from "../../asset/room&suit/5.png";
import img6 from "../../asset/room&suit/6.png";
import arrow from "../../asset/room&suit/arrow.svg";

const RoomSuite = () => {
  return (
    <section className="w-full h-[250vh] px-[10%] py-[6%] flex flex-col justify-start items-center gap-[4%]">
      <h2 className="font-heading w-full text-center text-[7rem] text-primary-foreground text-primary-heading">
        Rooms & Suits
      </h2>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="h-[60%] flex flex-col gap-5">
          <div
            className="h-[55%] bg-center flex flex-col justify-end p-[5%] bg-cover bg-slate-300 bg-blend-multiply"
            style={{ backgroundImage: `url(${img1.src})` }}
          >
            <h3 className="font-heading text-white text-[4rem] ">
              Superior Garden View
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <h1 className="font-body text-white text-[1.5rem]">
                Explore Room
              </h1>
              <img src={arrow.src} />
            </div>
          </div>
          <div className="h-[45%] flex flex-row gap-5">
            <div
              className="w-[60%] bg-center flex flex-col justify-end p-[5%] bg-cover bg-slate-300 bg-blend-multiply"
              style={{ backgroundImage: `url(${img2.src})` }}
            >
            <h3 className="font-heading text-white text-[4rem]">
              Deluxe
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <h1 className="font-body text-white text-[1.5rem]">
                Explore Room
              </h1>
              <img src={arrow.src} />
            </div>
            </div>
            <div
              className="w-[40%] bg-center flex flex-col justify-end p-[5%] bg-cover bg-slate-300 bg-blend-multiply"
              style={{ backgroundImage: `url(${img3.src})` }}
            >
            <h3 className="font-heading text-white text-[4rem]">
              Superior
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <h1 className="font-body text-white text-[1.5rem]">
                Explore Room
              </h1>
              <img src={arrow.src} />
            </div>
            </div>
          </div>
        </div>
        <div className="h-[40%] flex flex-row first-line: gap-5">
          <div
            className="w-[40%] bg-center flex flex-col justify-end p-[5%] bg-cover bg-slate-300 bg-blend-multiply"
            style={{ backgroundImage: `url(${img4.src})` }}
          >
          <h3 className="font-heading text-white text-[4rem]">
              Premier Sea View
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <h1 className="font-body text-white text-[1.5rem]">
                Explore Room
              </h1>
              <img src={arrow.src} />
            </div>
          </div>
          <div className="w-[60%] flex flex-col gap-5">
            <div
              className="h-[50%] bg-center flex flex-col justify-end p-[5%] bg-cover bg-slate-300 bg-blend-multiply"
              style={{ backgroundImage: `url(${img5.src})` }}
            >
            <h3 className="font-heading text-white text-[4rem]">
              Supreme
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <h1 className="font-body text-white text-[1.5rem]">
                Explore Room
              </h1>
              <img src={arrow.src} />
            </div>
            </div>
            <div
              className="h-[50%] bg-center flex flex-col justify-end p-[5%] bg-cover bg-slate-300 bg-blend-multiply"
              style={{ backgroundImage: `url(${img6.src})` }}
            >
            <h3 className="font-heading text-white text-[4rem]">
              Suite
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <h1 className="font-body text-white text-[1.5rem]">
                Explore Room
              </h1>
              <img src={arrow.src} />
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomSuite;
