import { setLogLevel } from "@firebase/firestore";
import { set } from "date-fns";
import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { boolean } from "zod";

const UploadimageGallery = ({ name, label, imageGallery }) => {
  const { setValue } = useFormContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    // console.log(imageGallery);
    if (imageGallery) {
      setSelectedFiles(imageGallery);
      setPreviewUrls(imageGallery);
    }
  }, [imageGallery]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    validateImage(files);
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);
    setValue(name, newFiles);
    console.log("newInputFile: ", newFiles);

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls((prevUrls) => [...prevUrls, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const validateImage = (imagesToPreview) => {
    if (imagesToPreview.length) {
      const newPreviewUrls = imagesToPreview.map((file) => {
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

      return Promise.all(newPreviewUrls).then((urls) => {
        // setPreviewUrls(urls.filter((url) => url !== null));
        // console.log(urls);
      });
    }
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
    setValue(name, newFiles);
    console.log("newFile: ", newFiles);
    console.log("dataInInput: ", inputRef.current.files);
    inputRef.current.value = "";
    console.log("dataInInputClear: ", inputRef.current.value);
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
        ref={inputRef}
      />
      <div className="flex gap-5 pb-10 flex-wrap">
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
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="flex flex-col gap-2 items-center justify-center w-40 h-40 md:w-50 md:h-50 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#E76B39] bg-[#F1F2F6] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <img src="/img/icon-upload-pic.svg" alt="Upload" />
          Upload photo
        </button>
      </div>
    </div>
  );
};

export default UploadimageGallery;
