import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingForm = ({ numberOfFields }) => {
  const fieldsArray = Array.from({ length: numberOfFields });

  return (
    <div className="space-y-4">
      {fieldsArray.map((_, index) => (
        <div key={index} className="flex flex-col">
          <Skeleton className="w-full h-6 bg-gray-300 rounded-md" />
          <Skeleton className="w-full h-12 bg-gray-200 rounded-md mt-2" />
        </div>
      ))}
      <Skeleton className="w-30 h-28 bg-gray-300 rounded-md mt-4" />
    </div>
  );
};

export default LoadingForm;
