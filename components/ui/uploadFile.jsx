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

  // Update form context with the selected file URL
  const updateProfilePicUrl = (file) => {
    setValue(name, file);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={(field) => (
        <FormItem className="flex flex-col gap-5">
          <FormLabel
            htmlFor={id}
            className="block text-xl tracking-tight font-semibold text-[#9AA1B9]"
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
          <div className="flex md:flex md:items-center ">
            <button
              type="button"
              onClick={() => document.getElementById(id)?.click()}
              className="flex flex-col gap-2 items-center justify-center w-20  h-20 md:w-44 md:h-44 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#E76B39] bg-[#F1F2F6] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <img src="/img/icon-upload-pic.svg" />
              Upload photo
            </button>
            {selectedFile && previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="ml-7 w-40 h-40 md:w-60 md:h-60 object-cover rounded-md border border-gray-200"
              />
            )}
          </div>
          {description && (
            <FormDescription className="mt-2 text-sm text-gray-500">
              {description}
            </FormDescription>
          )}
          <FormMessage className="mt-2 text-sm text-red-600" />
        </FormItem>
      )}
    />
  );
}

export default InputFile;
