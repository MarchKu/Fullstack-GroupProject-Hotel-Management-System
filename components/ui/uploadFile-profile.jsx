import React, { useState } from "react";
import { FormField, FormItem, FormLabel } from "@/components/ui/formComponent";
import { Input } from "@/components/ui/inputRegisterForm";
import { useFormContext } from "react-hook-form";

function InputFile({ control, name, type, label, id, currentPic, isChange }) {
  const randomString = Math.random().toString(36).substring(7);
  const { setValue } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState(`${currentPic}?${randomString}`);
  const [isChangePic, setIsChangePic] = useState(isChange);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setIsChangePic(false);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        updateProfilePicUrl(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfilePicUrl = (file) => {
    setValue(name, file);
  };

  const removeFile = () => {
    setIsChangePic(true);
    setPreviewUrl(null);
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

          {/* Show current image */}
          {isChangePic === "default" ? (
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
          ) : !isChangePic ? (
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
          ) : (
            isChangePic && (
              <button
                type="button"
                onClick={() => document.getElementById(id)?.click()}
                className="flex flex-col gap-2 items-center justify-center w-40  h-40 md:w-52 md:h-52 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#E76B39] bg-[#F1F2F6] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img src="/img/icon-upload-pic.svg" alt="upload" />
                Upload photo
              </button>
            )
          )}
        </FormItem>
      )}
    />
  );
}

export default InputFile;
