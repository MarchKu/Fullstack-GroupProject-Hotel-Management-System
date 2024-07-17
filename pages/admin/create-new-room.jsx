"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin-side/Sidebar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UploadMainImage from "@/components/admin-side/uploadMainImage";
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

const createRoomSchema = z.object({
  roomType: z.string().min(4),
  roomSize: z.string().min(2),
  bedType: z.string(),
  guest: z.string(),
  pricePerNight: z.string(),
  promotionPrice: z.optional(z.string()),
  roomDescription: z.string(),
  mainImage: z.custom((file) => file instanceof File, {
    message: "Main image is required.",
  }),
  imageGallery: z
    .array(
      z.custom((file) => file instanceof File, {
        message: "Each image must be a file.",
      })
    )
    .min(4, {
      message: "please select at least 4 image.",
    }),
  amentity: z.array(z.string()),
});

const CreateNewRoom = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedBedValue, setSelectedBedValue] = useState("Double bed");
  const [selectedGuestValue, setSelectedGuestValue] = useState("2");
  const [amenities, setAmenities] = useState([{ value: "" }]);
  const form = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      roomType: "",
      roomSize: "",
      bedType: "",
      guest: "",
      pricePerNight: "",
      promotionPrice: "",
      roomDescription: "",
      mainImage: {},
      imageGallery: {},
      amentity: {},
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("roomType", data.roomType);
    formData.append("roomSize", data.roomSize);
    formData.append("bedType", data.bedType);
    formData.append("guest", guest);
    formData.append("pricePerNight", data.pricePerNight);
    if (data.promotionPrice) {
      formData.append("promotionPrice", data.promotionPrice);
    }
    formData.append("roomDescription", data.roomDescription);
    formData.append("mainImage", data.mainImage);
    data.imageGallery.forEach((image, index) =>
      formData.append(`imageGallery[${index}]`, image)
    );
    data.amentity.forEach((amentity, index) =>
      formData.append(`amentity[${index}]`, amentity)
    );
    console.log("Form Data Submitted:", formData);
  };

  const handleAddAmenity = () => {
    setAmenities([...amenities, { value: "" }]);
  };

  const handleRemoveAmenity = (index) => {
    const list = [...amenities];
    list.splice(index, 1);
    setAmenities(list);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...amenities];
    list[index].value = value;
    setAmenities(list);
    console.log("amenities: ", amenities);
  };

  return (
    <div className="flex w-full bg-[#2F3E35]">
      <Sidebar />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center w-full flex-col bg-[#F6F7FC] pb-[135px]"
        >
          <article className="w-full flex items-center gap-4 bg-white px-[60px] py-[25px] ">
            <h1 className="w-full font-semibold text-xl">Create New Room</h1>
            <Button
              className="bg-white text-[#E76B39] font-semibold rounded border-[1px] border-[#E76B39] px-8 py-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#C14817] text-white font-semibold rounded px-8 py-4"
            >
              Create
            </Button>
          </article>
          <article className="w-full flex flex-col gap-10 mx-[60px] mt-10 px-20 pt-10 pb-[60px]  bg-white">
            <h2 className="w-full font-semibold text-xl text-[#9AA1B9]">
              Basic Information
            </h2>
            <FormField
              control={form.control}
              name="roomType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type *</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  render={() => (
                    <FormItem>
                      <FormLabel>Bed type *</FormLabel>
                      <FormControl>
                        <Select
                          value={selectedBedValue}
                          onValueChange={setSelectedBedValue}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Double bed">
                                Double bed
                              </SelectItem>
                              <SelectItem value="Single bed">
                                Single bed
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
                render={() => (
                  <FormItem className="pr-5">
                    <FormLabel>Guest(s) *</FormLabel>
                    <FormControl>
                      <Select
                        value={selectedGuestValue}
                        onValueChange={setSelectedGuestValue}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="4">4</SelectItem>
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
              <div className="w-full flex gap-4">
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
            <h2 className="text-xl font-semibold text-[#9AA1B9] pt-6 border-t-[1px]">
              Room Image
            </h2>

            <UploadMainImage
              control={form.control}
              name="mainImage"
              label="Main Image"
            />
            <UploadimageGallery
              control={form.control}
              name="imageGallery"
              label="Image Gallery (At least 4 pictures)"
            />
            <h2 className="text-xl font-semibold text-[#9AA1B9] pt-6 border-t-[1px]">
              Room Amenities
            </h2>
            {amenities.map((amenity, index) => (
              <div key={index} className="flex gap-6">
                <Input
                  type="text"
                  name={`amenity[${index}]`}
                  value={amenity.value}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <Button
                  className="w-1/6 text-[#C8CCDB] bg-white hover:bg-red hover:text-white"
                  onClick={handleRemoveAmenity}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Button
              onClick={handleAddAmenity}
              className="w-1/4 bg-white text-[#E76B39] border-[1px] border-[#E76B39] hover:text-white"
            >
              + Add Amenity
            </Button>
          </article>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewRoom;
