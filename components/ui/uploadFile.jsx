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

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Generate preview URL for image files
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
    const url = URL.createObjectURL(file); //create URL
    setValue(name, url);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={(field) => (
        <FormItem>
          <FormLabel
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </FormLabel>
          <Input
            id={id}
            type={type}
            onChange={handleFileChange} // Handle file selection
            className="sr-only" // Hide the input element for screen readers
            {...field}
          />
          <div className="mt-1 flex items-center">
            <button
              type="button"
              onClick={() => document.getElementById(id)?.click()} // Click on the file input element
              className="inline-flex items-center justify-center w-44 h-44 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Select File
            </button>
            {selectedFile && previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="ml-7 w-60 h-60 object-cover rounded-md border border-gray-200"
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
