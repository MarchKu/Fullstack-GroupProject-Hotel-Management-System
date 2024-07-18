"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin-side/Sidebar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import toastr from "toastr";
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
  roomTypeId: z.string(),
  roomSize: z.string().min(2),
  bedType: z.string(),
  guest: z.string(),
  pricePerNight: z.string().min(4, {
    message: "Price per night must be minimum 1,000 THB",
  }),
  promotionPrice: z.string(),
  roomDescription: z.string(),
});

const createRoom = async (data) => {
  try {
    await axios.post("http://localhost:3000/api/hotel/rooms", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toastr["success"]("You are successfully registered");
    setTimeout(function () {
      window.location.replace("/login");
    }, 1000);
  } catch (error) {
    console.log(error.message);
    toastr["error"]("Registration Failed");
  }
};

const CreateNewRoom = () => {
  const [selectedBedValue, setSelectedBedValue] = useState("Double bed");
  const [selectedGuestValue, setSelectedGuestValue] = useState("2");
  const [isDisabled, setIsDisabled] = useState(false);
  const form = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      roomTypeId: "1",
      roomSize: "32",
      bedType: "Double bed",
      guest: "2",
      pricePerNight: "0",
      promotionPrice: "0",
      roomDescription: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("roomTypeId", data.roomTypeId);
    formData.append("roomSize", data.roomSize);
    formData.append("bedType", data.bedType);
    formData.append("guest", data.guest);
    formData.append("pricePerNight", data.pricePerNight);
    formData.append("promotionPrice", data.promotionPrice);
    formData.append("roomDescription", data.roomDescription);
    console.log("Form Data Submitted:", Object.fromEntries(formData));
    createRoom(formData);
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
            <button className="bg-white text-[#E76B39] font-semibold rounded border-[1px] border-[#E76B39] px-8 py-4">
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
                render={({ field }) => (
                  <FormItem className="pr-5">
                    <FormLabel>Guest(s) *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => form.setValue("guest", value)}
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
            <div className="w-full flex gap-10 items-center">
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
          </article>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewRoom;
