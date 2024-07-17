import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const UploadimageGallery = ({ control, name, label }) => {
  const { setValue } = useFormContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (selectedFiles.length) {
      const newPreviewUrls = selectedFiles.map((file) => {
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        }
        return null;
      });

      Promise.all(newPreviewUrls).then((urls) => {
        setPreviewUrls(urls.filter((url) => url !== null));
      });
    }
  }, [selectedFiles]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files);
    updateProfilePicUrl(files);
  };

  const updateProfilePicUrl = (files) => {
    setValue(name, files);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
    setValue(name, newFiles);
    console.log(selectedFiles);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="file"
        onChange={handleFileChange}
        className="sr-only"
        multiple
      />
      <div className="flex gap-5 pb-10">
        <button
          type="button"
          onClick={() => document.getElementById(name)?.click()}
          className="flex flex-col gap-2 items-center justify-center w-40 h-40 md:w-50 md:h-50 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#E76B39] bg-[#F1F2F6] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <img src="/img/icon-upload-pic.svg" alt="Upload" />
          Upload photo
        </button>
        {previewUrls.map((previewUrl, index) => (
          <div key={index} className="relative">
            <img
              src={previewUrl}
              alt={`Preview ${index}`}
              className="w-40 h-40 object-cover rounded-md border border-gray-200"
            />
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute top-0 right-0 w-6 h-6 rounded-full text-white bg-red flex justify-center items-center pb-1"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadimageGallery;
