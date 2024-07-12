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
          <div className="flex gap-5 pb-10 pt-2">
            <button
              type="button"
              onClick={() => document.getElementById(id)?.click()}
              className="flex flex-col gap-2 items-center justify-center w-40  h-40 md:w-50 md:h-50 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#E76B39] bg-[#F1F2F6] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <img src="/img/icon-upload-pic.svg" />
              Upload photo
            </button>
            {selectedFile && previewUrl && (
              <div>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-md border border-gray-200 absolute"
                />
                <button
                  onClick={removeFile}
                  className="relative w-20 left-[8.5rem] bottom-5  md:left-[11.5rem] md:bottom-5"
                >
                  <img src="/img/delete.svg" alt="Error Trigger" />
                </button>
              </div>
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
