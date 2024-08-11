import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const RoomSuite = () => {
  return (
    <section
      className="w-full px-[10%] md:px-[5%] py-[5%] md:pb-[178px] flex flex-col justify-start items-center gap-10 md:gap-[72px]"
      id="room&suite"
    >
      <h2 className="font-heading w-full text-center text-[44px] md:text-[6rem] text-primary-foreground text-primary-heading ">
        Rooms & Suits
      </h2>
      <div className="w-full h-full flex flex-col gap-4 max-w-[1440px]">
        {/* First half */}
        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-5">
          <div
            className="bg-slate-300 md:col-span-5 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[1.5rem] pt-[138px] md:pt-[357px] pb-[1.5rem]"
            style={{ backgroundImage: `url(/room&suite/1.png)` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px] md:leading-[55px]">
              Superior Garden View
            </h3>
            <div className="w-full flex flex-row justify-start items-center">
              <Link
                href="/rooms/1"
                className="font-body text-white text-base hover:underline w-full flex items-center gap-[0.5rem]"
              >
                Explore Room
                <span>
                  <Image
                    src="/room&suite/arrow.svg"
                    alt="Arrow icon"
                    width={20}
                    height={20}
                  />
                </span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-3 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[1.5rem] pt-[138px] md:pt-[217px] pb-[1.5rem] "
            style={{ backgroundImage: `url(/room&suite/2.png)` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px] md:leading-[55px]">
              Deluxe
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link
                href="/rooms/2"
                className="font-body text-white text-base hover:underline w-full flex items-center gap-[0.5rem]"
              >
                Explore Room
                <span>
                  <Image
                    src="/room&suite/arrow.svg"
                    alt="Arrow icon"
                    width={20}
                    height={20}
                  />
                </span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-2 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[1.5rem] pt-[138px] md:pt-[217px] pb-[1.5rem] "
            style={{ backgroundImage: `url(/room&suite/3.png)` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px] md:leading-[55px]">
              Superior
            </h3>
            <div className="flex justify-start items-center">
              <Link
                href="/rooms/3"
                className="font-body text-white text-base hover:underline w-full flex items-center gap-[0.5rem]"
              >
                Explore Room
                <span>
                  <Image
                    src="/room&suite/arrow.svg"
                    alt="Arrow icon"
                    width={20}
                    height={20}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* Second half */}
        <div className="w-full h-[50%] grid gap-4 grid-cols-1 md:grid-cols-7">
          <div
            className="bg-slate-300 md:row-span-2 md:col-span-3 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[1.5rem] pt-[138px] pb-[1.5rem] "
            style={{ backgroundImage: `url(/room&suite/4.png)` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px]">
              Premier Sea View
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link
                href="/rooms/4"
                className="font-body text-white text-base hover:underline w-full flex items-center gap-[0.5rem]"
              >
                Explore Room
                <span>
                  <Image
                    src="/room&suite/arrow.svg"
                    alt="Arrow icon"
                    width={20}
                    height={20}
                  />
                </span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-4 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[1.5rem] pt-[138px] pb-[1.5rem] "
            style={{ backgroundImage: `url(/room&suite/5.png)` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px]">
              Supreme
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link
                href="/rooms/5"
                className="font-body text-white text-base hover:underline w-full flex items-center gap-[0.5rem]"
              >
                Explore Room
                <span>
                  <Image
                    src="/room&suite/arrow.svg"
                    alt="Arrow icon"
                    width={20}
                    height={20}
                  />
                </span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-4 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 pt-[138px] md:pl-[1.5rem] pb-[1.5rem] "
            style={{ backgroundImage: `url(/room&suite/6.png)` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px]">
              Suite
            </h3>
            <div className="flex justify-start items-center">
              <Link
                href="/rooms/6"
                className="font-body text-white text-base hover:underline w-full flex items-center gap-[0.5rem]"
              >
                Explore Room
                <span>
                  <Image
                    src="/room&suite/arrow.svg"
                    alt="Arrow icon"
                    width={20}
                    height={20}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomSuite;
