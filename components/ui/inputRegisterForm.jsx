import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, hasError, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10  rounded-md border border-[#D6D9E4] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-[#E76B39] disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground placeholder:text-[#9AA1B9]",
          hasError ? "border-red-500" : "border-[#D6D9E4]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
