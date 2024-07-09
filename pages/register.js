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

const registerSchema = z.object({
  fullName: z.string().min(2),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  idNumber: z.string(),
  dateBirth: z.date({
    message: "A date of birth is required.",
  }),
  country: z.string().nonempty({ message: "Please select a country." }),
  profilepic: z.string(),
});

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
    <div className=" sm:h-max md:h-screen flex-col  bg-cover bg-no-repeat bg-center bg-[url('../public/img/bg-register_page.jpg')]  ">
      <div className="flex justify-center p-10 lg:inset-0 bg-gradient-to-b from-[#00000099] to-transparent">
        <div className="container  md:h-max sm:h-full sm:w-full sm:max-w-4xl  bg-[#F7F7FB] p-16  ">
          <h1 className="text-[68px] font-serif text-[#2F3E35] font-medium tracking-tighter">
            Register
          </h1>
          <div className="flex flex-col gap-5 pt-10 font-body ">
            <h2 className="text-xl font-semibold tracking-tighter text-[#9AA1B9]">
              Basic Information
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="text-base font-normal grid grid-cols-2 gap-8 w-max-fit"
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
                  label="Upload Profile Picture"
                  id="profilepic"
                  type="file"
                  description="Select a file to upload."
                />

                <h1 className="text-xl col-span-2 font-semibold  tracking-tighter text-[#9AA1B9]">
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
                  placeholder="Enter your cvv number"
                />
                <Button type="submit" className="">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
