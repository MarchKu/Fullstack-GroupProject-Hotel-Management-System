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
    console.log(userData);
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
  ``;

  /* Handle submit */

  const onSubmit = async (data) => {
    const formPayload = new FormData();
    formPayload.append("full_name", data.full_name);
    formPayload.append("email", data.email);
    formPayload.append("id_number", data.id_number);
    formPayload.append("date_of_birth", data.date_of_birth);
    formPayload.append("country", data.country);
    formPayload.append("profile_picture", data.profile_picture);
    console.log(Object.fromEntries(formPayload));
    putUserProfile(user.username, formPayload);
  };

  /* Nav Bar Authen */
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);
  return (
    <>
      <NavbarComponent />
      <section className="w-full h-[95vh] py-[10%] md:py-[5%] px-[5%] bg-gray-400 flex flex-col justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-[1440px] h-full flex flex-col justify-center items-center "
          >
            <div className="w-full h-[10%] flex justify-between items-center ">
              <h1 className="text-[5rem] font-serif text-[#2F3E35] font-medium ">
                Profile
              </h1>
              <Button type="submit" className="w-[180px] h-[60%]">
                Update Profile
              </Button>
            </div>

            <h2 className="w-full h-[5%] text-[1.7rem] font-semibold text-[#9AA1B9] content-center">
              Basic Information
            </h2>
            <div className="w-full h-[95%] grid grid-cols-1 grid-rows-10 md:grid-cols-2 gap-[1rem] md:gap-[1.5rem] pt-[5%]">
              <div className="md:col-span-2 h-full">
                <FormFieldComponent
                  control={form.control}
                  name="full_name"
                  label="Full Name"
                  type="text"
                  placeholder="Enter your name and last name"
                />
              </div>

              <FormFieldComponent
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              <FormFieldComponent
                control={form.control}
                name="id_number"
                label="ID Number"
                type="text"
                placeholder="Enter your ID number"
              />
              <DatePicker
                control={form.control}
                name="date_of_birth"
                label="Date of Birth"
                placeholder="Enter your date of birth"
              />

              <CountryPicker
                control={form.control}
                name="country"
                label="Country"
                placeholder="Select your country"
              />
              <div></div>
              <div className="hidden md:block"></div>
              {userData !== null && (
                <div>
                  <InputFile
                    control={form.control}
                    name="profile_picture"
                    label="Profile Picture"
                    id="profile_picture"
                    type="file"
                    currentPic={userData.profile_picture}
                    isChange="default"
                  />
                </div>
              )}
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
