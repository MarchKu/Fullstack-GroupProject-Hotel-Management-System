import React from "react";
import { Button } from "../ui/button";
import { useState } from "react";

const LoadingButton = (props) => {
  return (
    <Button
      type={props.type}
      className={props.className}
    >
      {props.isClick ? (
        <div>
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
          <span className="ml-2">{props.loadingText}</span>
        </div>
      ) : (
        <span className="ml-2">{props.text}</span>
      )}
    </Button>
  );
};

export default LoadingButton;
