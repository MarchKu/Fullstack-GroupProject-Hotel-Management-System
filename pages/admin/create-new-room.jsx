"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin-side/Sidebar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  FormProvider,
  useFormContext,
  setValue,
} from "react-hook-form";
import axios from "axios";
import toastr from "toastr";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UploadMainImage from "@/components/admin-side/UploadMainImage";
import UploadimageGallery from "@/components/admin-side/UploadimageGallery";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const createRoomSchema = z.object({
  roomTypeId: z.string(),
  roomSize: z.string().min(2),
  bedType: z.string(),
  guest: z.string(),
  pricePerNight: z.string().min(4, {
    message: "Price per night must be minimum 1,000 THB",
  }),
  promotionPrice: z.string(),
  roomDescription: z.string(),
  mainImage: z.custom((file) => file instanceof File, {
    message: "Main Image is required.",
  }),
  imageGallery: z.array(
    z.object({
      id: z.number(),
      file: z.custom((file) => file instanceof File, {
        message: "File must be a valid File object.",
      }),
    })
  ),
  amenity: z.array(
    z.object({
      id: z.number(),
      value: z.string(),
    })
  ),
});

const createRoom = async (data) => {
  try {
    console.log(
      "Object.fromEntries(data).imageGallery: ",
      Object.fromEntries(data).imageGallery
    );
    await axios.post("https://neatly-hotel.vercel.app/api/hotel/rooms", data, {
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

const CreateNewRoom = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [amenities, setAmenities] = useState([{ id: 1, value: "" }]);

  const form = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      roomTypeId: "1",
      roomSize: "32",
      bedType: "Single bed",
      guest: "2",
      pricePerNight: "0",
      promotionPrice: "0",
      roomDescription: "",
      mainImage: {},
      imageGallery: [],
      amenity: [{ id: 1, value: "" }],
    },
  });

  const onSubmit = async (data) => {
    console.log("Data Submitted:", data);

    const formData = new FormData();
    formData.append("roomTypeId", data.roomTypeId);
    formData.append("roomSize", data.roomSize);
    formData.append("bedType", data.bedType);
    formData.append("guest", data.guest);
    formData.append("pricePerNight", data.pricePerNight);
    formData.append("promotionPrice", data.promotionPrice);
    formData.append("roomDescription", data.roomDescription);
    formData.append("mainImage", data.mainImage);
    for (let i = 0; i < data.imageGallery.length; i++) {
      formData.append("imageGallery", data.imageGallery[i].file);
    }

    for (let i = 0; i < data.amenity.length; i++) {
      formData.append("amenity", data.amenity[i].value);
    }

    console.log("Form Data Submitted:", Object.fromEntries(formData));
    // createRoom(formData);
  };

  const imageGallery = form.watch("imageGallery");
  console.log("imageGalleryWatch: ", imageGallery);

  const handleBackRooms = () => {
    window.location.replace("/admin/room-management");
  };

  const handleAddAmenity = () => {
    setAmenities([
      ...amenities,
      {
        id: amenities.length + 1,
        value: "",
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    const updatedAmenities = amenities.map((amenity, i) => {
      if (index === i) {
        return {
          ...amenity,
          value: e.target.value,
        };
      }
      return amenity;
    });
    setAmenities(updatedAmenities);
    // setValue("amenity", updatedAmenities);
  };

  const handleRemoveAmenity = (index) => {
    const updatedAmenities = amenities.filter((_, i) => i !== index);
    setAmenities(updatedAmenities);
    // setValue("amenity", updatedAmenities);
  };

  const getAmenityPosition = (id) => {
    return amenities.findIndex((amenity) => amenity.id === id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    let updatedAmenities;
    setAmenities((amenities) => {
      const oldIndex = getAmenityPosition(active.id);
      const newIndex = getAmenityPosition(over.id);
      updatedAmenities = arrayMove(amenities, oldIndex, newIndex);

      return arrayMove(amenities, oldIndex, newIndex);
    });
    form.setValue("amenity", updatedAmenities);
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
            <article className="w-full flex items-center gap-4 bg-white px-[60px] py-[25px] ">
              <h1 className="w-full font-semibold text-xl">Create New Room</h1>
              <button
                className="bg-white text-[#E76B39] font-semibold rounded border-[1px] border-[#E76B39] px-8 py-4"
                onClick={handleBackRooms}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#C14817] text-white font-semibold rounded px-8 py-4"
              >
                Create
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
                                <SelectItem value="Single bed">
                                  Single bed
                                </SelectItem>
                                <SelectItem value="Double bed">
                                  Double bed
                                </SelectItem>
                                <SelectItem value="Double bed (King size)">
                                  Double bed (King size)
                                </SelectItem>
                                <SelectItem value="Twin bed">
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
              <div className="w-full flex gap-10 items-end">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="pricePerNight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Night (THB) *</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                    id="setIsDisabled"
                    className="w-6"
                    checked={isDisabled}
                    onChange={() => setIsDisabled(!isDisabled)}
                  />
                  <label htmlFor="setIsDisabled">Promotion Price</label>
                  <FormField
                    control={form.control}
                    name="promotionPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isDisabled ? false : true}
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
              />
              <UploadimageGallery
                name="imageGallery"
                label="Image Gallery(At least 4 pictures) *"
                control={form.control}
              />
              {/* ---------- Amenity ---------- */}

              <h2 className="text-xl font-semibold text-[#9AA1B9] pt-6 border-t-[1px]">
                Room Amenities
              </h2>

              <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
                <AmenityInput
                  amenities={amenities}
                  control={form.control}
                  handleInputChange={handleInputChange}
                  handleRemoveAmenity={handleRemoveAmenity}
                />
              </DndContext>
              <Button
                onClick={handleAddAmenity}
                className="w-1/4 bg-white text-[#E76B39] border-[1px] border-[#E76B39] hover:text-white"
                type="button"
              >
                + Add Amenity
              </Button>
            </article>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default CreateNewRoom;
