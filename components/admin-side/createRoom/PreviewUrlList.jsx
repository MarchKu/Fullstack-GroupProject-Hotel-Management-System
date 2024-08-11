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

const PreviewUrlList = ({
  previewUrls,
  id,
  file,
  control,
  index,
  removeFile,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // PointerEvents: ,
  };

  const { setValue } = useFormContext();

  return (
    <div
      key={id}
      className="rounded-lg relative"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <Image
        src={file}
        alt={`Preview ${index}`}
        className="w-40 h-40 object-cover rounded-md border border-gray-200"
        width={160}
        height={160}
        {...listeners}
      />
      <button
        type="button"
        onClick={() => removeFile(index)}
        className="absolute top-0 right-0 w-6 h-6 rounded-full text-white bg-red flex justify-center items-center pb-1"
      >
        x
      </button>
    </div>
  );
};

export default PreviewUrlList;
