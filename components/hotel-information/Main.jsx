"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/formComponent";
import InputFile from "../ui/uploadFile";
import FormFieldComponent from "../ui/FormField";
import toastr from "toastr";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

const hotelSchema = z.object({
  hotelName: z.string().min(1),
  hotelDescription: z.string().min(2),
  hotelLogo: z.custom((file) => file instanceof File, {
    message: "Hotel Logo is required",
  }),
});
const Main = () => {
  const [hotelData, setHotelData] = useState({});
  const [hasImage, setHasImage] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const form = useForm({
    resolver: zodResolver(hotelSchema),
  });

  const { reset } = form;

  useEffect(() => {
    const getHotelData = async () => {
      const result = await axios.get("http://localhost:3000/api/getHotelData");
      setHotelData(result.data.data);

      reset({
        hotelName: result.data.data.hotel_name,
        hotelDescription: result.data.data.hotel_description,
        hotelLogo: result.data.data.hotel_logo,
      });
    };

    const getAdminData = () => {
      const admin = localStorage.getItem("admin");
      const parsedAdminData = JSON.parse(admin);
      const adminUsername = parsedAdminData.username;
      setAdminData(adminUsername);
    };

    getHotelData();
    getAdminData();
  }, [reset]);

  useEffect(() => {
    hotelData.hotel_logo ? setHasImage(true) : setHasImage(false);
  }, [hotelData, adminData]);

  const updateHotelData = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/hotel/property", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toastr["success"]("Updated hotel information successfully");
    } catch (error) {
      console.log(error);
      toastr["error"]("Failed to updat hotel information successfully");
    }
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("hotelName", data.hotelName);
    formData.append("hotelDescription", data.hotelDescription);
    formData.append("hotelLogo", data.hotelLogo);
    formData.append("adminUsername", adminData);
    console.log("submit");

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
            <FormField
              control={form.control}
              name="hotelDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Description"
                      className="min-h-[150px] resize-none focus-visible:border-red"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            {hasImage ? (
              <>
                <label htmlFor="">Hotel logo *</label>
                <div className="relative w-[167px] h-[167px] flex justify-center bg-[#F1F2F6] rounded">
                  <Image
                    src={hotelData.hotel_logo}
                    className="object-contain"
                    width={160}
                    height={160}
                    alt={hotelData.hotel_name}
                  />
                  <button
                    className="absolute top-0 right-0 w-6 h-6 pb-[2px] rounded-full bg-[#B61515] text-white flex justify-center items-center"
                    onClick={() => setHasImage(false)}
                  >
                    x
                  </button>
                </div>
              </>
            ) : (
              <InputFile
                control={form.control}
                name="hotelLogo"
                label="Hotel Logo*"
                id="hotelLogo"
                type="file"
              />
            )}
          </div>
        </section>
      </form>
    </Form>
  );
};

export default Main;
