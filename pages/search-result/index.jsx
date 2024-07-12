import { useState } from "react";
import { SearchBox } from "@/components/search-component/SearchBox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import vector from "../../assets/search_result/vector.svg";
import { arrRoomImage } from "@/utils/carousel-info-array/carousel-search-result";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog-room-popup";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-room-pop-up";

export default function Search_result() {
  const [isRoomdetailOpen, setIsRoomDetailOpen] = useState(false);
  const [isRoomImgOpen, setIsRoomImgOpen] = useState(false);

  const handlePopUpRoomDetail = () => {
    setIsRoomDetailOpen(true);
  };

  const handlePopUpRoomImage = () => {
    setIsRoomImgOpen(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center font-body">
        <div className="w-full h-20 border"></div>
        <div className=" w-full h-[400px] flex border-t rounded bg-white justify-center items-center shadow-xl shadow-gray-200 md:h-[150px] md:sticky md:top-0 md:z-10">
          <SearchBox />
        </div>

        {/* room search result */}

        <div className="w-full flex flex-col items-center md:mt-12 md:mb-28 md:z-0">
          <div className=" mt-12 pb-4 border-b border-gray-300 flex flex-col justify-center md:max-w-[1120px] md:h-[400px] md:flex-row md:justify-between md:items-center md:mt-0 md:pb-0">
            <div className="relative md:w-[450px] md:h-[320px] borde">
              <img
                onClick={handlePopUpRoomImage}
                className="object-cover md:w-[full] md:h-[320px] hover:cursor-pointer"
                src="https://s3-alpha-sig.figma.com/img/9acd/b248/5293a673abe39b8e38083080ea3eb21c?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G431blUxL9RjiTk7HkHyvQNfyq3XcsmYjymY4Nqit2f~Ls~LavCoyCBaK9HJVarlFZrCR5Mgw9EX1NzPgKlyUFRnSEOgT3nwd-0uMXhSE8wrl3kf-~rGa2P51lu-eGC4AyvP7~IyvSZYvHifmkxKD3aMJtmW36xtFEv4E16Xe-dPEnCc7VovHUnNTCJy~7oAUH4zK95Nr6Ajt7rtmu27OCZs9ALGQ~sCF3W3tnrYQPUJts84I-Ohnqf6vsxFDTyLIXqHiHsicBrrJ6eVZ8lMC2Xm88duxl2UJ4gED8XsYZTlo5wexCyiP3JNDBQG42lPBlipqyhfv6OSj2nwDeOG8Q__"
                alt="garden view"
              />
              <Image src={vector} className="absolute bottom-0 left-0" />
            </div>

            <div className="p-4 flex flex-col md:max-w-[620px] md:h-[320px] md:justify-between md:pl-12">
              <div className="md:flex">
                <div>
                  <h1 className="w-full text-[28px] font-semibold">
                    Superior Garden View
                  </h1>
                  <div className="w-full text-gray-700 flex gap-4 my-4">
                    <span>2 Guests</span>
                    <span className="text-gray-500">|</span>
                    <span>1 Double bed</span>
                    <span className="text-gray-500">|</span>
                    <span>32 sqm</span>
                  </div>
                  <p className="w-full text-gray-700 mb-4">
                    Rooms (36sqm) with full garden views, 1 single bed, bathroom
                    with bathtub & shower.
                  </p>
                </div>
                <div className="w-full text-right my-4">
                  <div>
                    <p className="line-through text-gray-700">THB 3,100.00</p>
                    <p className="text-xl font-semibold">THB 2,500.00</p>
                  </div>
                  <div className="my-4">
                    <p className="text-gray-700">Per Night</p>
                    <p className="text-gray-700">(Including Taxes & Fees)</p>
                  </div>
                </div>
              </div>
              <div className="w-[90%] flex flex-row  justify-end self-end">
                <Button
                  variant="ghost"
                  onClick={handlePopUpRoomDetail}
                  className="w-40 text-orange-500 hover:text-orange-400 hover:bg-white"
                >
                  Room Detail
                </Button>
                <Button className="w-40 rounded">Book Now</Button>
              </div>

              {/* pop-up room detail */}

              <Dialog
                open={isRoomdetailOpen}
                onOpenChange={setIsRoomDetailOpen}
              >
                <DialogContent className="sm:max-w-[800px] h-[620px] ">
                  <DialogHeader className="h-[60px] px-4 md:px-20 border-b flex flex-row items-center">
                    <DialogClose className="h-0 absolute top-0 right-0">
                      <X className="m-4" />
                    </DialogClose>
                    <DialogTitle className="text-xl font-semibold">
                      Superior Garden View
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea>
                    <div className="w-full px-4 mb-8 flex flex-col gap-4 md:px-4 lg:px-20">
                      <Carousel className="self-center">
                        <CarouselContent>
                          {arrRoomImage.map((img, index) => (
                            <CarouselItem key={index} className="">
                              <img
                                className=" object-cover w-full h-[60vw] md:object-cover md:w-full md:h-[460px] lg:h-[400px]"
                                src={img}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious
                          className={cn(
                            "-left-[-20px] bg-non text-white w-[40px] h-[40px] border-2"
                          )}
                        />
                        <CarouselNext
                          className={cn(
                            "-right-[-20px] bg-non text-white w-[40px] h-[40px] border-2"
                          )}
                        />
                      </Carousel>
                      <div className="w-full text-gray-700 flex gap-4">
                        <span>2 Guests</span>
                        <span className="text-gray-500">|</span>
                        <span>1 Double bed</span>
                        <span className="text-gray-500">|</span>
                        <span>32 sqm</span>
                      </div>
                      <p className="w-full text-gray-700">
                        Rooms (36sqm) with full garden views, 1 single bed,
                        bathroom with bathtub & shower.
                      </p>
                      <div>
                        <h3>Room Amenities</h3>
                        <ul className="relative left-8 top-2 list-disc list-outside text-gray-700 md:columns-2">
                          <li>Safe in Room</li>
                          <li>Air Conditioning</li>
                          <li>High speed internet connection</li>
                          <li>iHairdryer</li>
                          <li>Shower</li>
                          <li>Bathroom amenities</li>
                          <li>Lamp</li>
                          <li>Minibar</li>
                          <li>Telephone</li>
                          <li>Ironing board</li>
                          <li>A floor only accessible via a guest room key</li>
                          <li>Alarm clock</li>
                          <li>iHairdryer</li>
                          <li>iHairdryer</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              {/* pop-up full image */}

              <Dialog open={isRoomImgOpen} onOpenChange={setIsRoomImgOpen}>
                <DialogContent className="sm:max-w-[170vw]  h-full">
                  <div className="flex justify-center items-center bg-black overflow-hidden">
                    <DialogClose className="h-0 absolute top-0 right-0">
                      <X className="text-white m-4" />
                    </DialogClose>
                    <Carousel
                      opts={{
                        align: "center",
                        loop: true,
                      }}
                      className=""
                    >
                      <CarouselContent className="lg:w-[180vw] flex items-center lg:justify-between ">
                        {arrRoomImage.map((img, index) => (
                          <CarouselItem
                            key={index}
                            className="lg:basis-1/3 lg:p-4"
                          >
                            <img
                              className="  w-full h-auto lg:h-[80vh] lg:object-cover"
                              src={img}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      <CarouselPrevious
                        className="-left-[-20px] lg:left-[29.4%] bg-non text-white w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] border-2"
                        arrowStyle="lg:w-8 lg:h-6"
                      />
                      <CarouselNext
                        className="-right-[-20px] lg:right-[30%] bg-non text-white w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] border-2"
                        arrowStyle="lg:w-8 lg:h-6"
                      />
                    </Carousel>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className=" mt-12 pb-4 border-b border-gray-300 flex flex-col justify-center md:max-w-[1120px] md:h-[400px] md:flex-row md:justify-between md:items-center md:mt-0 md:pb-0">
            <div className="relative md:w-[450px] md:h-[320px] borde">
              <img
                onClick={handlePopUpRoomImage}
                className="object-cover md:w-[full] md:h-[320px] hover:cursor-pointer"
                src="https://s3-alpha-sig.figma.com/img/9acd/b248/5293a673abe39b8e38083080ea3eb21c?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G431blUxL9RjiTk7HkHyvQNfyq3XcsmYjymY4Nqit2f~Ls~LavCoyCBaK9HJVarlFZrCR5Mgw9EX1NzPgKlyUFRnSEOgT3nwd-0uMXhSE8wrl3kf-~rGa2P51lu-eGC4AyvP7~IyvSZYvHifmkxKD3aMJtmW36xtFEv4E16Xe-dPEnCc7VovHUnNTCJy~7oAUH4zK95Nr6Ajt7rtmu27OCZs9ALGQ~sCF3W3tnrYQPUJts84I-Ohnqf6vsxFDTyLIXqHiHsicBrrJ6eVZ8lMC2Xm88duxl2UJ4gED8XsYZTlo5wexCyiP3JNDBQG42lPBlipqyhfv6OSj2nwDeOG8Q__"
                alt="garden view"
              />
              <Image src={vector} className="absolute bottom-0 left-0" />
            </div>

            <div className="p-4 flex flex-col md:max-w-[620px] md:h-[320px] md:justify-between md:pl-12">
              <div className="md:flex">
                <div>
                  <h1 className="w-full text-[28px] font-semibold">
                    Superior Garden View
                  </h1>
                  <div className="w-full text-gray-700 flex gap-4 my-4">
                    <span>2 Guests</span>
                    <span className="text-gray-500">|</span>
                    <span>1 Double bed</span>
                    <span className="text-gray-500">|</span>
                    <span>32 sqm</span>
                  </div>
                  <p className="w-full text-gray-700 mb-4">
                    Rooms (36sqm) with full garden views, 1 single bed, bathroom
                    with bathtub & shower.
                  </p>
                </div>
                <div className="w-full text-right my-4">
                  <div>
                    <p className="line-through text-gray-700">THB 3,100.00</p>
                    <p className="text-xl font-semibold">THB 2,500.00</p>
                  </div>
                  <div className="my-4">
                    <p className="text-gray-700">Per Night</p>
                    <p className="text-gray-700">(Including Taxes & Fees)</p>
                  </div>
                </div>
              </div>
              <div className="w-[90%] flex flex-row  justify-end self-end">
                <Button
                  variant="ghost"
                  onClick={handlePopUpRoomDetail}
                  className="w-40 text-orange-500 hover:text-orange-400 hover:bg-white"
                >
                  Room Detail
                </Button>
                <Button className="w-40 rounded">Book Now</Button>
              </div>

              {/* pop-up room detail */}

              <Dialog
                open={isRoomdetailOpen}
                onOpenChange={setIsRoomDetailOpen}
              >
                <DialogContent className="sm:max-w-[800px] h-[620px] ">
                  <DialogHeader className="h-[60px] px-4 md:px-20 border-b flex flex-row items-center">
                    <DialogClose className="h-0 absolute top-0 right-0">
                      <X className="m-4" />
                    </DialogClose>
                    <DialogTitle className="text-xl font-semibold">
                      Superior Garden View
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea>
                    <div className="w-full px-4 mb-8 flex flex-col gap-4 md:px-4 lg:px-20">
                      <Carousel className="self-center">
                        <CarouselContent>
                          {arrRoomImage.map((img, index) => (
                            <CarouselItem key={index} className="">
                              <img
                                className=" object-cover w-full h-[60vw] md:object-cover md:w-full md:h-[460px] lg:h-[400px]"
                                src={img}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious
                          className={cn(
                            "-left-[-20px] bg-non text-white w-[40px] h-[40px] border-2"
                          )}
                        />
                        <CarouselNext
                          className={cn(
                            "-right-[-20px] bg-non text-white w-[40px] h-[40px] border-2"
                          )}
                        />
                      </Carousel>
                      <div className="w-full text-gray-700 flex gap-4">
                        <span>2 Guests</span>
                        <span className="text-gray-500">|</span>
                        <span>1 Double bed</span>
                        <span className="text-gray-500">|</span>
                        <span>32 sqm</span>
                      </div>
                      <p className="w-full text-gray-700">
                        Rooms (36sqm) with full garden views, 1 single bed,
                        bathroom with bathtub & shower.
                      </p>
                      <div>
                        <h3>Room Amenities</h3>
                        <ul className="relative left-8 top-2 list-disc list-outside text-gray-700 md:columns-2">
                          <li>Safe in Room</li>
                          <li>Air Conditioning</li>
                          <li>High speed internet connection</li>
                          <li>iHairdryer</li>
                          <li>Shower</li>
                          <li>Bathroom amenities</li>
                          <li>Lamp</li>
                          <li>Minibar</li>
                          <li>Telephone</li>
                          <li>Ironing board</li>
                          <li>A floor only accessible via a guest room key</li>
                          <li>Alarm clock</li>
                          <li>iHairdryer</li>
                          <li>iHairdryer</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              {/* pop-up full image */}

              <Dialog open={isRoomImgOpen} onOpenChange={setIsRoomImgOpen}>
                <DialogContent className="sm:max-w-[170vw]  h-full">
                  <div className="flex justify-center items-center bg-black overflow-hidden">
                    <DialogClose className="h-0 absolute top-0 right-0">
                      <X className="text-white m-4" />
                    </DialogClose>
                    <Carousel
                      opts={{
                        align: "center",
                        loop: true,
                      }}
                      className=""
                    >
                      <CarouselContent className="lg:w-[180vw] flex items-center lg:justify-between ">
                        {arrRoomImage.map((img, index) => (
                          <CarouselItem
                            key={index}
                            className="lg:basis-1/3 lg:p-4"
                          >
                            <img
                              className="  w-full h-auto lg:h-[80vh] lg:object-cover"
                              src={img}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      <CarouselPrevious
                        className="-left-[-20px] lg:left-[29.4%] bg-non text-white w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] border-2"
                        arrowStyle="lg:w-8 lg:h-6"
                      />
                      <CarouselNext
                        className="-right-[-20px] lg:right-[30%] bg-non text-white w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] border-2"
                        arrowStyle="lg:w-8 lg:h-6"
                      />
                    </Carousel>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
