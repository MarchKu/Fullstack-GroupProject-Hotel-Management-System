"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/formComponent";
import React from "react";
import FormFieldComponent from "../components/ui/FormField";
import DatePicker from "../components/ui/datePick";
import CountryPicker from "../components/ui/countryPick";
import InputFile from "@/components/ui/uploadFile";

const minAge = 18;
const registerSchema = z.object({
  fullName: z.string().min(2),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  //refine checkUniqueUsername
  password: z
    .string()
    .min(12, { message: "Password must be at least 12 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  idNumber: z
    .string()
    .min(13, { message: "ID Number must be at least 13 digits." }),
  //refine checkUniqueIdNumber
  dateBirth: z
    .date({
      message: "A date of birth is required.",
    })
    .refine(
      (date) => {
        const ageCalculated = Date.now() - date.getTime();
        const ageDate = new Date(ageCalculated);
        return Math.abs(ageDate.getUTCFullYear() - 1970) >= minAge;
      },
      { message: `You must be at least ${minAge} years old.` }
    ),
  country: z.string().nonempty({ message: "Please select a country." }),
  profilepic: z.string(),
  cardOwner: z.string().nonempty({ message: "Card Owner is required." }),
  expiryDate: z.string().nonempty({ message: "Expiry Date is required." }),
  cvv: z.string().nonempty({ message: "CVV is required." }),
  cardnumber: z
    .string()
    .length(16, { message: "Credit Card must be 16 digits long." })
    .regex(/^\d+$/, { message: "Credit Card must be numeric." }),
});

//call API get data and check if user exists

export default function Register() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      email: "",
      idNumber: "",
      dateBirth: "",
      country: "",
      profilepic: "",
      cardnumber: "",
      cardOwner: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    //register(data);
  };

  return (
    <div className="w-screen h-screen inset-0 bg-cover bg-no-repeat bg-center bg-[url('../public/img/bg-register_page.jpg')]">
      <div className="absolute  h-full w-full  flex justify-center items-center  bg-gradient-to-b from-[#00000099] to-transparent ">
        <div className="relative p-2 md:p-14  md:w-[45%] bg-[#F7F7FB]  rounded-lg">
          <div className="  flex flex-col gap-5 font-body ">
            <h1 className="text-7xl font-serif text-[#2F3E35] font-medium tracking-tighter">
              Register
            </h1>
            <h2 className="text-xl pt-5 pb-5 font-semibold tracking-tighter text-[#9AA1B9]">
              Basic Information
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="text-base font-normal gap-3 grid grid-cols-1 md:grid-cols-2 "
              >
                <div className="col-span-2">
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
                <Button type="submit" className="mt-5 bg-[#C14817]">
                  Register
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
