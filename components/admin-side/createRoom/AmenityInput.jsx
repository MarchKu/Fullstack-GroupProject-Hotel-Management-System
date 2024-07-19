"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const AmenityInput = ({ amenities, setAmenities, control }) => {
  const { setValue } = useFormContext();

  const handleAddAmenity = () => {
    setAmenities([...amenities, ""]);
  };

  const handleRemoveAmenity = (index) => {
    const list = [...amenities];
    list.splice(index, 1);
    setAmenities(list);
    setValue("amenity", amenities);
  };

  const handleInputChange = (e, index) => {
    const targetValue = e.target.value;
    const list = [...amenities];
    list[index] = targetValue;
    setAmenities(list);
    setValue("amenity", list);
  };

  return (
    <>
      {amenities.map((amenity, index) => (
        <div key={index} className="flex gap-6 items-end">
          <div className="w-full">
            <FormField
              control={control}
              name="roomDescription"
              render={({}) => (
                <FormItem>
                  <FormLabel>Amenity *</FormLabel>
                  <FormControl>
                    <Input onChange={(e) => handleInputChange(e, index)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <Input type="text" onChange={(e) => handleInputChange(e, index)} /> */}
          <Button
            className="w-1/6 text-[#E76B39] bg-white hover:bg-red hover:text-white"
            onClick={() => handleRemoveAmenity(index)}
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
    </>
  );
};

export default AmenityInput;
