import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import DragButton from "@/assets/admin/drag.png";
import { set } from "date-fns";

const AmenityList = ({
  amenities,
  id,
  value,
  control,
  index,
  handleRemoveAmenity,
  handleInputChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const { setValue } = useFormContext();

  return (
    <div
      key={id}
      className="flex items-end gap-6"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className="flex items-center justify-center h-full gap-[2px] pt-2">
        <Image src={DragButton} alt="drag button" width={4} height={16} />
        <Image src={DragButton} alt="drag button" width={4} height={16} />
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
                  value={value}
                  onChange={(e) => {
                    handleInputChange(e, index);
                    // console.log("amenities", amenities);
                    setValue(`amenity`, amenities);
                  }}
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
        onClick={() => {
          handleRemoveAmenity(index);
          setValue(
            "amenity",
            amenities.filter((_, i) => i !== index)
          );
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default AmenityList;
