import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = ({
  rows,
  columns,
  colWidths,
  height = "h-14",
  borderColor = "#E4E6ED",
  colSpan,
  padding,
}) => {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className={`bg-[#FFFFFF] w-full ${height} grid grid-cols-${columns} font-body text-sm font-normal tracking-tighter text-[#000000]
          border-b-[1px] border-[${borderColor}]`}
        >
          {colWidths.map((width, colIndex) => (
            <div
              key={colIndex}
              className={`${padding} pl-5 flex justify-between items-center ${{
                colSpan,
              }}`}
            >
              <Skeleton className={width} />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Loading;
