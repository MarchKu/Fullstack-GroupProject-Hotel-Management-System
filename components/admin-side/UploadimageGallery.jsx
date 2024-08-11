import { setLogLevel } from "@firebase/firestore";
import { set } from "date-fns";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { boolean } from "zod";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PreviewUrlList from "./createRoom/PreviewUrlList";

const UploadimageGallery = ({ name, label, imageGallery, control }) => {
  const { setValue } = useFormContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    // console.log(imageGallery);
    let newImages;
    if (imageGallery) {
      setSelectedFiles((prev) => {
        const newFiles = imageGallery.map((file, index) => ({
          id: index + 1,
          file: file,
        }));
        newImages = [...prev, ...newFiles];
        return [...prev, ...newFiles];
      });
      setPreviewUrls((prev) => {
        const newPreviewUrls = imageGallery.map((file, index) => ({
          id: index + 1,
          file: file,
        }));
        return [...prev, ...newPreviewUrls];
      });
      setValue(name, newImages);
    }
  }, [imageGallery]);

  useEffect(() => {
    console.log("previewUrls: ", previewUrls);
  }, [previewUrls]);

  useEffect(() => {
    console.log("selectedFiles: ", selectedFiles);
  }, [selectedFiles]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    validateImage(files);
    let newSelectedFiles;
    setSelectedFiles((prevFiles) => {
      const newFiles = files.map((file, index) => ({
        id: prevFiles.length + index + 1, // Ensure unique IDs
        file: file,
      }));

      // Log new files and selected files
      console.log("newInputFile: ", newFiles);
      newSelectedFiles = [...prevFiles, ...newFiles];
      // Return the updated selected files array
      return [...prevFiles, ...newFiles];
    });

    // setValue(name, selectedFiles);
    setValue(name, newSelectedFiles);

    // console.log("selectedFiles: ", selectedFiles);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const newPreviewUrlsPromises = imageFiles.map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: previewUrls.length + index + 1, // Ensure unique IDs
            file: reader.result,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviewUrlsPromises).then((newPreviewUrls) => {
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    });

    // Update the state with the new preview URLs
    // setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);

    // files.forEach((file) => {
    //   if (file.type.startsWith("image/")) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setPreviewUrls((prevUrls) => [...prevUrls, reader.result]);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // });
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
    console.log("newPreviewUrls: ", newPreviewUrls);
  };

  const getImagePosition = (id) => {
    return previewUrls.findIndex((previewUrls) => previewUrls.id === id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;
    if (!active.id || !over.id) return;
    if (active.id === over.id) return;

    const updateArrays = (previewUrls, selectedFiles) => {
      const oldIndex = getImagePosition(active.id);
      const newIndex = getImagePosition(over.id);

      const updatedPreviewUrls = arrayMove(previewUrls, oldIndex, newIndex);
      const updatedSelectedFiles = arrayMove(selectedFiles, oldIndex, newIndex);

      return { updatedPreviewUrls, updatedSelectedFiles };
    };

    setPreviewUrls((prevPreviewUrls) => {
      const { updatedPreviewUrls, updatedSelectedFiles } = updateArrays(
        prevPreviewUrls,
        selectedFiles
      );
      setSelectedFiles(updatedSelectedFiles);
      setValue(name, updatedSelectedFiles);

      return updatedPreviewUrls;
    });
  };

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;

  //   if (active.id === over.id) return;

  //   let updatedPreviewUrls;
  //   setPreviewUrls((previewUrls) => {
  //     const oldIndex = getImagePosition(active.id);
  //     const newIndex = getImagePosition(over.id);
  //     updatedPreviewUrls = arrayMove(previewUrls, oldIndex, newIndex);
  //     console.log("updatedPreviewUrls: ", updatedPreviewUrls);

  //     return arrayMove(previewUrls, oldIndex, newIndex);
  //   });

  //   // form.setValue("imageGallery", updatedPreviewUrls);
  // };
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
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={previewUrls} strategy={rectSortingStrategy}>
            {previewUrls.map((previewUrl, index) => (
              <PreviewUrlList
                previewUrls={previewUrls}
                id={previewUrl.id}
                file={previewUrl.file}
                index={index}
                key={index}
                control={control}
                removeFile={removeFile}
              />
            ))}
          </SortableContext>
        </DndContext>
        {/* {previewUrls.map((previewUrl, index) => (
          <div key={index} className="relative">
            <Image
              src={previewUrl.file}
              alt={`Preview ${index}`}
              className="w-40 h-40 object-cover rounded-md border border-gray-200"
              width={160}
              height={160}
            />
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute top-0 right-0 w-6 h-6 rounded-full text-white bg-red flex justify-center items-center pb-1"
            >
              x
            </button>
          </div>
        ))} */}
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="flex flex-col gap-2 items-center justify-center w-40 h-40 md:w-50 md:h-50 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#E76B39] bg-[#F1F2F6] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Image
            src="/img/icon-upload-pic.svg"
            alt="Upload"
            width={40}
            height={40}
          />
          Upload photo
        </button>
      </div>
    </div>
  );
};

export default UploadimageGallery;
