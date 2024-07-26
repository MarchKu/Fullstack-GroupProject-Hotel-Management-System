"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DragButton from "@/assets/admin/drag.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const AmenityInput = ({ amenities, setAmenities, control, prevAmenities }) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    if (prevAmenities) {
      setAmenities(prevAmenities);
    }
  }, [prevAmenities]);

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
    <section className="flex flex-col gap-6">
      {amenities.map((amenity, index) => (
        <div key={index} className="flex items-end gap-6">
          <div className="flex items-center justify-center gap-[2px] h-full pt-2">
            <Image src={DragButton} />
            <Image src={DragButton} />
          </div>
          <div className="w-full">
            <FormField
              control={control}
              name="roomDescription"
              render={({}) => (
                <FormItem>
                  <FormLabel>Amenity *</FormLabel>
                  <FormControl>
                    <Input
                      value={amenity}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            className=" text-[#E76B39] bg-white hover:bg-red hover:text-white"
            onClick={() => handleRemoveAmenity(index)}
          >
            Delete
          </Button>
        </div>
      ))}
      <Button
        onClick={handleAddAmenity}
        className="w-1/4 bg-white text-[#E76B39] border-[1px] border-[#E76B39] hover:text-white"
        type="button"
      >
        + Add Amenity
      </Button>
    </section>
  );
};

export default AmenityInput;
