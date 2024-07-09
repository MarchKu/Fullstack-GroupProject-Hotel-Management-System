import React from "react";
import Image from "next/image";
import FooterLogo from "../../assets/Footer/FooterLogo.png";
import PhoneIcon from "../../assets/Footer/PhoneIcon.png";
import MailIcon from "../../assets/Footer/MailIcon.png";
import LocationIcon from "../../assets/Footer/LocationIcon.png";
import FacebookIcon from "../../assets/Footer/FacebookIcon.png";
import IgIcon from "../../assets/Footer/IgIcon.png";
import TwitterIcon from "../../assets/Footer/TwitterIcon.png";

const FooterComponent = () => {
  return (
    <div className="w-screen px-4 md:px-[120px] bg-[#2F3E35] h-[529px] md:h-[485px] flex flex-col items-center text-white md:justify-between">
      <div className="flex flex-col md:flex-row md:justify-between md:w-full md:max-w-[1200px] gap-6 mb-6 md:mb-0 max-w-[343px] md:mt-[66px]">
        <div>
          <Image
            src={FooterLogo}
            alt="Neatly Logo"
            className="w-[180px] h-12 my-10 md:mt-0"
            width="auto"
            height="auto"
          />
          <h1 className="font-semibold text-xl mb-2">Neatly Hotel</h1>
          <p className="font-normal text-base">
            The best hotel for rising your experience
          </p>
        </div>
        <div className="flex flex-col w-full md:max-w-[379px] gap-4 md:gap-6">
          <h1 className="font-medium text-base my-4">CONTACT</h1>
          <div className="flex w-full gap-4">
            <Image
              src={PhoneIcon}
              alt="Phone icon"
              className="w-5 h-5"
              width="auto"
              height="auto"
            />
            <p>+66 99 999 9999</p>
          </div>
          <div className="flex w-full gap-4">
            <Image
              src={MailIcon}
              alt="Mail icon"
              className="w-5 h-5"
              width="auto"
              height="auto"
            />
            <p>contact@neatlyhotel.com</p>
          </div>
          <div className="flex w-full gap-4">
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
      <div className=" w-full  ">
        <div className="flex mb-10 justify-between border-t-[1px] border-[#465C50] pt-6 md:mx-auto md:max-w-[1200px] ">
          <div className="flex gap-1">
            <Image
              src={FacebookIcon}
              alt="facebook icon"
              className="w-6 h-6"
              width="auto"
              height="auto"
            />
            <Image
              src={IgIcon}
              alt="instragam icon"
              className="w-6 h-6"
              width="auto"
              height="auto"
            />
            <Image
              src={TwitterIcon}
              alt="twitter icon"
              className="w-6 h-6"
              width="auto"
              height="auto"
            />
          </div>
          <p className="max-w-[240px] w-full text-right tracking-[-0.1px]">
            Copyright ©2022 Neatly Hotel
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
