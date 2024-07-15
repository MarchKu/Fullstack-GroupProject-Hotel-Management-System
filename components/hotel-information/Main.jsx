"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/formComponent";
import InputFile from "../ui/uploadFile";
import FormFieldComponent from "../ui/FormField";

const hotelSchema = z.object({
  hotelName: z.string().min(1),
  hotelDescription: z.string().min(2),
  hotelLogo: z.custom((file) => file instanceof File, {
    message: "Hotel Logo is required",
  }),
});
const Main = () => {
  const form = useForm({
    resolver: zodResolver(hotelSchema),
  });

  const { reset } = form;

  useEffect(() => {
    const getHotelData = async () => {
      const result = await axios.get("http://localhost:3000/api/getHotelData");

      console.log("hotelData: ", result.data.data);

      reset({
        hotelName: result.data.data.hotel_name,
        hotelDescription: result.data.data.hotel_description,
        hotelLogo: result.data.data.hotel_logo,
      });
    };
    getHotelData();
  }, [reset]);

  const updateHotelData = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/hotel/property", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("hotelName", data.hotelName);
    formData.append("hotelDescription", data.hotelDescription);
    formData.append("hotelLogo", data.hotelLogo);
    formData.append("adminId", 1);

    updateHotelData(formData);
  };

  return (
    <Form {...form}>
      <form
        className="w-full bg-[#F6F7FC]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <section className="flex justify-between items-center px-[60px] py-[25px] bg-white h-[80px]">
          <h1 className="text-xl font-semibold">Hotel Information</h1>
          <button
            className="bg-[#C14817] text-white h-12 px-8 rounded"
            type="submit"
          >
            Update
          </button>
        </section>
        <section className="bg-white mx-[60px] my-10 py-10 px-[80px] rounded flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <FormFieldComponent
              control={form.control}
              name="hotelName"
              label="Hotel Name*"
              type="text"
              placeholder="Enter your name and last name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <FormFieldComponent
              control={form.control}
              name="hotelDescription"
              label="Hotel Description*"
              type="textarea"
              placeholder="Enter description"
            />
          </div>
          <div className="flex flex-col gap-2">

            <InputFile
              control={form.control}
              name="hotelLogo"
              label="Hotel Logo*"
              id="hotelLogo"
              type="file"
            />
          </div>
        </section>
      </form>
    </Form>
  );
};

export default Main;
