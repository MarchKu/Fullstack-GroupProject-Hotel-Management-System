import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/formComponent";
import { Input } from "@/components/ui/inputRegisterForm";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

function InputFile({ control, name, type, label, id, description }) {
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
  };
  return (
    <FormField
      control={control}
      name={name}
      render={(field) => (
        <FormItem className="flex flex-col gap-5">
          <FormLabel
            htmlFor={id}
            className="pointer-events-none block text-xl tracking-tight font-semibold text-[#9AA1B9]"
          >
            {label}
          </FormLabel>
          <Input
            id={id}
            type={type}
            onChange={handleFileChange}
            className="sr-only"
            {...field}
          />
          <div className="flex gap-5 pb-10 pt-2">
            {selectedFile && previewUrl ? (
              <div className="relative  ">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={200}
                  height={150}
                  className="w-40 h-40  md:w-50 md:h-50 object-contain rounded-md border border-gray-200"
                />
                <button
                  onClick={removeFile}
                  className="w-10 h-10 absolute bottom-[8.5rem] right-0 left-[8.8rem]  flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                >
                  <Image
                    src="/img/delete.svg"
                    alt="Error Trigger"
                    width={40}
                    height={40}
                  />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => document.getElementById(id)?.click()}
                className="flex flex-col gap-2  items-center justify-center w-40  h-40 md:w-50 md:h-50 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#E76B39] bg-[#F1F2F6] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Image
                  src="/img/icon-upload-pic.svg"
                  alt="Upload icon"
                  width={40}
                  height={40}
                />
                Upload photo
              </button>
            )}
          </div>
          {description && (
            <FormDescription className="mt-2 text-sm text-gray-500">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputFile;
