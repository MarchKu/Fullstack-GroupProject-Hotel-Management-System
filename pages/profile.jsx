"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/formComponent";
import React from "react";
import FormFieldComponent from "@/components/ui/FormField";
import DatePicker from "@/components/ui/datePick";
import CountryPicker from "@/components/ui/countryPick";
import InputFile from "@/components/ui/uploadFile-profile";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import { useState, useEffect } from "react";
import useUserProfile from "@/hooks/use-user-profile";
import useHotelData from "@/hooks/use-hotel-data";
import { Skeleton } from "@/components/ui/skeleton";

/* Set schema */
const profileSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email("Invalid email"),
  id_number: z
    .string()
    .min(13, { message: "ID Number must be 13 digits." })
    .max(13, { message: "ID Number must be 13 digits." }),
  date_of_birth: z
    .date({
      message: "A date of birth is required.",
    })
    .refine(
      (date) => {
        const ageCalculated = Date.now() - date.getTime();
        const ageDate = new Date(ageCalculated);
        return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
      },
      { message: `You must be at least 18 years old.` }
    ),
  country: z.string(),
  profile_picture: z.any(),
});

/* fetch user profile */
export default function Profile() {
  const { userData, getUserProfile, putUserProfile, isLoading, isError } =
    useUserProfile();
  const { hotelData, getHotelData } = useHotelData();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* Set default value */
  const form = useForm({
    resolver: zodResolver(profileSchema),
  });

  /* Get user from localstorage */
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      }
    };
    fetchUserData();
    getHotelData();
  }, []);

  /* Data fetching */
  useEffect(() => {
    if (user) {
      getUserProfile(user.username);
    }
  }, [user]);

  /* Set form default data to featching data */
  useEffect(() => {
    if (userData) {
      form.reset({
        full_name: userData.full_name,
        email: userData.email,
        id_number: userData.id_number,
        date_of_birth: new Date(userData.date_of_birth),
        country: userData.country,
        profile_picture: userData.profile_picture,
      });
    }
  }, [userData, form]);

  /* Handle submit */

  const onSubmit = async (data) => {
    const formPayload = new FormData();
    formPayload.append("full_name", data.full_name);
    formPayload.append("email", data.email);
    formPayload.append("id_number", data.id_number);
    formPayload.append("date_of_birth", data.date_of_birth);
    formPayload.append("country", data.country);

    if (data.profile_picture instanceof File) {
      formPayload.append("profile_picture", data.profile_picture);
    }
    await putUserProfile(user.username, formPayload);
  };

  /* Nav Bar Authen */
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col">
        <div className="inline-block"></div>
        <div className="inline-block"></div>
      </div>
      <section className="w-full min-h-[92vh] py-[10%] md:py-[5%] px-[5%] bg-gray-400 flex flex-col justify-start items-center overflow-hidden">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-full max-w-[1440px] flex flex-col justify-center items-center font-body"
          >
            <div className="size-full flex flex-col">
              <div className="w-full h-auto flex justify-between items-center">
                <h1 className="text-[4rem] md:[5rem] font-heading text-primary-heading">
                  Profile
                </h1>
                <Button
                  type="submit"
                  className="text-[1.25rem] font-normal hidden md:block"
                >
                  Update Profile
                </Button>
              </div>

              <div className="flex flex-col gap-[1rem] md:gap-[1.5rem] w-full h-auto mt-[1.5rem] md:mt-[2rem]">
                <h2 className="w-full h-auto text-[1.25rem] md:text-[1.7rem] font-semibold text-[#9AA1B9]">
                  Basic Information
                </h2>
                <div className=" h-full content-center">
                  <FormFieldComponent
                    control={form.control}
                    name="full_name"
                    label="Full Name"
                    type="text"
                    placeholder="Enter your name and last name"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-[1rem] md:gap-[1.5rem] justify-between">
                  <div className="content-center w-full">
                    <FormFieldComponent
                      control={form.control}
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="content-center w-full">
                    <FormFieldComponent
                      control={form.control}
                      name="id_number"
                      label="ID Number"
                      type="text"
                      placeholder="Enter your ID number"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-[1rem] md:gap-[1.5rem] justify-between">
                  <div className="content-center w-full">
                    <DatePicker
                      control={form.control}
                      name="date_of_birth"
                      label="Date of Birth"
                      placeholder="Enter your date of birth"
                    />
                  </div>
                  <div className="content-center w-full">
                    <CountryPicker
                      control={form.control}
                      name="country"
                      label="Country"
                      placeholder="Select your country"
                    />
                  </div>
                </div>
              </div>
              <hr className="bg-gray-500 border-none h-[2px] my-[1.5rem]" />
              <div className="w-full h-auto">
                {userData ? (
                  <InputFile
                    control={form.control}
                    name="profile_picture"
                    label="Profile Picture"
                    id="profile_picture"
                    type="file"
                    currentPic={userData.profile_picture}
                    isChange="default"
                  />
                ) : (
                  <>
                    <h3 className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full h-auto text-[1.25rem] md:text-[1.7rem]  text-[#9AA1B9] content-end pb-[1.5rem]">
                      Profile upload
                    </h3>
                    <Skeleton className="size-52"></Skeleton>
                  </>
                )}
              </div>
              <Button
                type="submit"
                className="text-[1.25rem] font-normal black md:hidden"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
