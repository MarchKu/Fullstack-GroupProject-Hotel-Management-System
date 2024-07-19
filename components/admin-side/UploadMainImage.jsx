"use client";

import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/formComponent";
import { Input } from "@/components/ui/inputRegisterForm";
import { useFormContext, Controller } from "react-hook-form";
import { FormControl } from "../ui/form";

const UploadMainImage = ({ control, name, label }) => {
  const { setValue } = useFormContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
    if (file) {
      updateProfilePicUrl(file);
    }
  };

  const updateProfilePicUrl = (file) => {
    setValue(name, file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue(null, null);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={(field) => (
        <FormItem className="">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input
              id={name}
              type="file"
              onChange={handleFileChange}
              className="sr-only"
              {...field}
            />
          </FormControl>
          <div className="flex gap-5 pb-10">
            <button
              type="button"
              onClick={() => document.getElementById(name)?.click()}
              className="flex flex-col gap-2 items-center justify-center w-60 h-60 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#E76B39] bg-[#F1F2F6] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <img src="/img/icon-upload-pic.svg" alt="Upload" />
              Upload photo
            </button>
            {selectedFile && previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-0 right-0 w-6 h-6 rounded-full text-white bg-red flex justify-center items-center pb-1"
                >
                  x
                </button>
              </div>
            )}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadMainImage;
