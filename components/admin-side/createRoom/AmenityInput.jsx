"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import AmenityList from "./AmenityList";

const AmenityInput = ({
  amenities,
  setAmenities,
  control,
  prevAmenities,
  handleInputChange,
  handleRemoveAmenity,
}) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    let newAmenities;
    if (prevAmenities) {
      setAmenities((prev) => {
        const newAmenity = prevAmenities.map((amenity, index) => ({
          id: index + 1,
          value: amenity,
        }));
        newAmenities = [...newAmenity];
        return [...newAmenity];
      });
      setValue("amenity", newAmenities);
    }
  }, [prevAmenities]);

  // console.log(amenities);

  return (
    <section className="flex flex-col gap-6">
      <SortableContext items={amenities} strategy={verticalListSortingStrategy}>
        {amenities.map((amenity, index) => (
          <AmenityList
            amenities={amenities}
            id={amenity.id}
            value={amenity.value}
            index={index}
            key={index}
            control={control}
            handleInputChange={handleInputChange}
            handleRemoveAmenity={handleRemoveAmenity}
          />
        ))}
      </SortableContext>
    </section>
  );
};

export default AmenityInput;
