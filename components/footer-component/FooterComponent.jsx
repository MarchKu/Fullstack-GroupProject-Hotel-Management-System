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
    <footer className="w-full min-h-[600px] md:min-h-[485px] h-[70vh] md:h-[50vh] bg-primary-heading font-body text-white flex flex-col justify-between items-center px-[10%] md:pt-[5%] md:pb-[2.5%] py-[10%]">
      <div className="size-full">
        <div className="size-full flex flex-col md:flex-row justify-between items-center">
          <div className="size-full flex flex-col justify-start items-start pb-[1.5rem] text-[1.2rem] lg:text-[1.5rem] xl:text-[1.7rem]">
            <Image
              src={FooterLogo}
              alt="Neatly Logo" 
              className="pb-[2rem] "
              width="auto"
              height="auto"
            />
            <h1 className="font-semibold  pb-[1rem]">
              Neatly Hotel
            </h1>
            <p>The best hotel for rising your experience</p>
          </div>
          <div className="w-full md:w-[40%] h-full flex flex-col justify-start items-start pb-[1.5rem] text-[1.2rem] lg:text-[1.5rem] xl:text-[1.7rem]">
            <h1 className="pb-[2rem]">CONTACT</h1>
            <div className="flex gap-[1.5rem] pb-[1.5rem]">
              <Image
                src={PhoneIcon}
                alt="Phone icon"
                className="w-5 h-5"
                width="auto"
                height="auto"
              />
              <p>+66 99 999 9999</p>
            </div>
            <div className="flex gap-[1.5rem] pb-[1.5rem]">
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
      <div className="flex flex-row justify-between w-full border-t-[1px] border-green-700 pt-[2rem]">
        <div className="flex gap-[1rem]">
          <Image
            src={FacebookIcon}
            alt="facebook icon"
            className="md:size-[2rem] xl:size-[3rem]"
            width="auto"
            height="auto"
          />
          <Image
            src={IgIcon}
            alt="instragam icon"
            className="md:size-[2rem] xl:size-[3rem]"
            width="auto"
            height="auto"
          />
          <Image
            src={TwitterIcon}
            alt="twitter icon"
            className="md:size-[2rem] xl:size-[3rem]"
            width="auto"
            height="auto"
          />
        </div>
        <p className="text-green-300 text-[0.8rem] lg:text-[1.25rem] xl:text-[1.5rem] text-center content-center">
          Copyright ©2022 Neatly Hotel
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
