import React from "react";
import Sidebar from "@/components/admin-side/Sidebar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/formComponent";
import FormFieldComponent from "@/components/ui/FormField";
import DatePicker from "@/components/ui/datePick";
import CountryPicker from "@/components/ui/countryPick";
import InputFile from "@/components/ui/uploadFile";
import { useAuth } from "@/contexts/authentication";
import { Button } from "@/components/ui/button";

const createRoomSchema = z.object({
  roomType: z.string(),
  roomSize: z.string(),
  bedType: z.array(z.string()),
  guest: z.array(z.string()),
  pricePerNight: z.string(),
  promotionPrice: z.optional(z.string()),
  roomDescription: z.string(),
  mainImage: z.custom((file) => file instanceof File, {
    message: "Room image is required.",
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
    data.bedType.forEach((bed, index) =>
      formData.append(`bedType[${index}]`, bed)
    );
    data.guest.forEach((guest, index) =>
      formData.append(`guest[${index}]`, guest)
    );
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
  return (
    <div className="flex w-full">
      <Sidebar />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center w-full flex-col bg-[#F6F7FC]"
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

          <article className="w-full flex flex-col gap-10 mx-[60px] mt-10 px-20 pt-10 bg-white">
            <h2 className="w-full font-semibold text-xl text-[#9AA1B9]">
              Basic Information
            </h2>
            <FormFieldComponent
              control={form.control}
              name="roomType"
              label="Room Type *"
              type="text"
            />

            <div className="w-full flex gap-10">
              <div className="w-full">
                <FormFieldComponent
                  control={form.control}
                  name="roomSize"
                  label="Room size (sqm) *"
                  type="text"
                />
              </div>
              <div className="w-full">
                <FormFieldComponent
                  control={form.control}
                  name="bedType"
                  label="Room Type *"
                  type="text"
                />
              </div>
            </div>
          </article>

          {/*               
          <div className="md:col-span-2">
            <FormFieldComponent
              control={form.control}
              name="fullName"
              label="Full Name"
              type="text"
              placeholder="Enter your name and last name"
            />
          </div>

          <FormFieldComponent
            control={form.control}
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
          />
          <FormFieldComponent
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <FormFieldComponent
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <FormFieldComponent
            control={form.control}
            name="idNumber"
            label="ID Number"
            type="text"
            placeholder="Enter your ID number"
          />
          <DatePicker
            control={form.control}
            name="dateBirth"
            label="Date of Birth"
            placeholder="Enter your date of birth"
          />

          <CountryPicker
            control={form.control}
            name="country"
            label="Country"
            placeholder="Select your country"
          />
          <div className="col-span-2 border-b border-[#E4E6ED]"></div>

          <InputFile
            control={form.control}
            name="profilepic"
            label="Upload  Picture"
            id="profilepic"
            type="file"
          />

          <h1 className="border-t pt-5 border-[#E4E6ED] text-xl col-span-2 font-semibold  tracking-tighter text-[#9AA1B9]">
            Credit Card
          </h1>
          <FormFieldComponent
            control={form.control}
            name="cardnumber"
            label="Card Number"
            type="text"
            placeholder="Enter your card number"
          />
          <FormFieldComponent
            control={form.control}
            name="cardOwner"
            label="Card Owner"
            type="text"
            placeholder="Enter your card name"
          />
          <FormFieldComponent
            control={form.control}
            name="expiryDate"
            label=" Expiry Date"
            type="text"
            placeholder="MM/YY"
          />
          <FormFieldComponent
            control={form.control}
            name="cvv"
            label="cvv"
            type="text"
            placeholder="CVC/CVV"
          />
          <Button
            type="submit"
            className="mt-5 bg-[#C14817] w-full md:col-span-1"
          >
            Register
          </Button> */}
        </form>
      </Form>
    </div>
  );
};

export default CreateNewRoom;
