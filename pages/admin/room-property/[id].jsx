"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toastr from "toastr";
import Image from "next/image";
import Sidebar from "@/components/admin-side/Sidebar";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import UploadMainImage from "@/components/admin-side/uploadMainImage";
import UploadimageGallery from "@/components/admin-side/UploadimageGallery";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/pages/api/upload";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AmenityInput from "@/components/admin-side/createRoom/AmenityInput";
import backIcon from "@/assets/admin/arrow_back.png";

const createRoomSchema = z.object({
  roomTypeId: z.string(),
  roomSize: z.string().min(2),
  bedType: z.string(),
  guest: z.string(),
  pricePerNight: z.string().min(4, {
    message: "Price per night must be minimum 1,000 THB",
  }),
  promotionPrice: z.string().optional(),
  roomDescription: z.string(),
  mainImage: z.custom(
    (value) => {
      return (
        value instanceof File ||
        (typeof value === "string" && value.startsWith("http"))
      );
    },
    {
      message: "Main Image must be either a file or a URL string.",
    }
  ),
  imageGallery: z
    .array(
      z.custom(
        (value) => {
          return (
            value instanceof File ||
            (typeof value === "string" && value.startsWith("http"))
          );
        },
        {
          message: "Each image must be either a file or a URL string.",
        }
      )
    )
    .min(4, {
      message: "Please select at least 4 images.",
    }),
  amenity: z.array(z.string()),
});

const EditRoomProperties = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [amenities, setAmenities] = useState([""]);
  const [roomProperties, setRoomProperties] = useState({});
  const { id } = router.query;

  const form = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      roomTypeId: "6",
      roomSize: "32 sqm",
      bedType: "single bed",
      guest: "2",
      pricePerNight: "",
      promotionPrice: "0",
      roomDescription: "",
      mainImage: {},
      imageGallery: [],
      amenity: [""],
    },
  });

  useEffect(() => {
    const fetchRoomProperties = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/room/${id}`
          );
          const roomData = response.data[0];

          setRoomProperties(roomData);
        } catch (error) {
          console.error("Failed to fetch room properties:", error);
        }
      }
    };

    fetchRoomProperties();
  }, [id]);

  useEffect(() => {
    console.log("roomProperties:", roomProperties);
    if (roomProperties.promotionPrice === null) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }

    form.reset({
      roomTypeId: roomProperties.room_type_id,
      roomSize: roomProperties.room_size,
      bedType: roomProperties.bed_type,
      guest: roomProperties.room_capacity,
      pricePerNight: roomProperties.current_price,
      roomDescription: roomProperties.room_description,
      mainImage: roomProperties.main_image,
      imageGallery: roomProperties.gallery_images,
      amenity: roomProperties.amenities,
    });
  }, [roomProperties]);

  const UpdateRoom = async (formData) => {
    if (!(formData instanceof FormData)) {
      console.error("Expected FormData instance");
      return;
    }
    const imageGallery = formData.getAll("imageGallery");
    // console.log("imageGallery: ", imageGallery);
    if (!Array.isArray(imageGallery)) {
      console.error("imageGallery is not an array:", imageGallery);
      return;
    }
    const galleryImageUrls = [];
    const imageUrlArray = imageGallery.filter(
      (item) => typeof item === "string"
    );
    const imageFile = imageGallery.filter((item) => item instanceof File);
    console.log("imageUrlArray:", imageUrlArray);
    console.log("imageFile:", imageFile);

    try {
      galleryImageUrls.push(...imageUrlArray);
      const uploadPromises = imageFile.map(async (file, index) => {
        const buffer = await file.arrayBuffer();
        const mimetype = file.type;

        const uploadResult = await uploadFile(
          buffer,
          "admin_uploads",
          `room_images/image_gallery/${roomProperties.room_id}/${
            index + 1 + imageUrlArray.length
          }`,
          mimetype
        );

        return uploadResult.data.data.publicUrl;
      });
      const uploadedUrls = await Promise.all(uploadPromises);
      galleryImageUrls.push(...uploadedUrls);
      formData.delete("imageGallery");
      galleryImageUrls.forEach((url) => {
        formData.append("imageGallery", url);
      });
      await axios.put(`http://localhost:3000/api/hotel/rooms/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toastr["success"]("You are successfully registered");
      setTimeout(function () {
        window.location.replace("/admin/create-new-room");
      }, 1000);
    } catch (error) {
      console.log(error.message);
      toastr["error"]("Registration Failed");
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("roomId", id);
    formData.append("roomTypeId", data.roomTypeId);
    formData.append("roomSize", data.roomSize);
    formData.append("bedType", data.bedType);
    formData.append("guest", data.guest);
    formData.append("pricePerNight", data.pricePerNight);
    if (isChecked) {
      formData.append("promotionPrice", data.promotionPrice);
    }
    formData.append("roomDescription", data.roomDescription);
    formData.append("mainImage", data.mainImage);
    for (let i = 0; i < data.imageGallery.length; i++) {
      formData.append("imageGallery", data.imageGallery[i]);
    }
    for (let i = 0; i < data.amenity.length; i++) {
      formData.append("amenity", data.amenity[i]);
    }

    console.log("Form Data Submitted:", Object.fromEntries(formData));
    await UpdateRoom(formData);
  };

  // const imageGalleryWatch = form.watch("imageGallery");
  // console.log("imageGalleryWatch:", imageGalleryWatch);

  const deleteRoom = async () => {
    try {
      await axios.delete("http://localhost:3000/api/hotel/rooms", {
        params: { id },
      });
      toastr["success"]("Room deleted successfully");

      // await axios.delete(`http://localhost:3000/api/hotel/rooms/${id}`);
      // toastr["success"]("Room deleted successfully");
      // setTimeout(function () {
      //   window.location.replace("/admin/create-new-room");
      // }, 1000);
    } catch (error) {
      console.error("Failed to delete room:", error);
      toastr["error"]("Failed to delete room");
    }
  };

  return (
    <div className="flex w-full bg-[#2F3E35]">
      <Sidebar />
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center w-full flex-col bg-[#F6F7FC] pb-[135px]"
          >
            <article className="w-full flex items-center justify-between bg-white px-[60px] py-[25px] ">
              <div className="flex items-center gap-4">
                <button className="" type="button">
                  <Image src={backIcon} alt="" className="w-6 h-6" />
                </button>
                <h1 className="w-full font-semibold text-xl">
                  {roomProperties.type_name}
                </h1>
              </div>
              <button
                type="submit"
                className="bg-[#C14817] text-white font-semibold rounded px-8 py-4"
              >
                Update
              </button>
            </article>
            <article className="w-full flex flex-col gap-10 mx-[60px] mt-10 px-20 pt-10 pb-[60px]  bg-white">
              <h2 className="w-full font-semibold text-xl text-[#9AA1B9]">
                Basic Information
              </h2>
              {/* ---------- Room Type ---------- */}
              <FormField
                control={form.control}
                name="roomTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) =>
                          form.setValue("roomTypeId", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">
                              Superior Garden View
                            </SelectItem>
                            <SelectItem value="2">Deluxe</SelectItem>
                            <SelectItem value="3">Superior</SelectItem>
                            <SelectItem value="4">Premier Sea View</SelectItem>
                            <SelectItem value="5">Supreme</SelectItem>
                            <SelectItem value="6">Suite</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ---------- Room size & Bed type ---------- */}

              <div className="w-full flex gap-10">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="roomSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room size (sqm) *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="bedType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bed type *</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) =>
                              form.setValue("bedType", value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="single bed">
                                  Single bed
                                </SelectItem>
                                <SelectItem value="double bed">
                                  Double bed
                                </SelectItem>
                                <SelectItem value="double bed (king size)">
                                  Double bed (King size)
                                </SelectItem>
                                <SelectItem value="twin bed">
                                  Twin bed
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* ---------- Guest ---------- */}
              <div className="w-1/2 flex flex-col">
                <FormField
                  control={form.control}
                  name="guest"
                  render={({ field }) => (
                    <FormItem className="pr-5">
                      <FormLabel>Guest(s) *</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) =>
                            form.setValue("guest", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="6">6</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* ---------- Price & Promotion ---------- */}
              <div className="w-full flex gap-10 items-center">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="pricePerNight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Night (THB) *</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex gap-4 items-center">
                  <input
                    type="checkbox"
                    name=""
                    id="setIsChecked"
                    className="w-6"
                    checked={!isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />

                  <label htmlFor="setIsChecked">Promotion Price</label>
                  <FormField
                    control={form.control}
                    name="promotionPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            disabled={!isChecked ? false : true}
                            value={!isChecked ? field.value : 0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* ---------- Room Description ---------- */}
              <FormField
                control={form.control}
                name="roomDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Description *</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ---------- Room Image ---------- */}

              <h2 className="text-xl font-semibold text-[#9AA1B9] pt-6 border-t-[1px]">
                Room Image
              </h2>
              <UploadMainImage
                control={form.control}
                name="mainImage"
                label="Main Image"
                mainImage={roomProperties.main_image}
              />
              <UploadimageGallery
                name="imageGallery"
                label="Image Gallery (At least 4 pictures) *"
                imageGallery={roomProperties.gallery_images}
              />
              {/* ---------- Amenity ---------- */}

              <h2 className="text-xl font-semibold text-[#9AA1B9] pt-6 border-t-[1px]">
                Room Amenities
              </h2>
              <AmenityInput
                amenities={amenities}
                setAmenities={setAmenities}
                control={form.control}
                prevAmenities={roomProperties.amenities}
              />
            </article>
            <div className="flex justify-end w-full px-[3%] py-[34px]">
              <button
                type="button"
                className=" hover:bg-red hover:text-white py-2 px-4 rounded-xl"
                onClick={deleteRoom}
              >
                Delete Room
              </button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default EditRoomProperties;
