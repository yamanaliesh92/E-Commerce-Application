"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  width?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  bgColor = "bg-primary",
  width = "w-full",
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`py-2 ps-4 pe-4 disabled:cursor-not-allowed cursor-pointer text-white font-bold rounded-md hover:bg-opacity-80 focus:outline-none ${bgColor} ${width} ${
        disabled ? "dark:bg-gray-500 bg-gray-400" : bgColor
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {!isLoading ? (
        children
      ) : (
        <ClipLoader
          color={"#ffffff"}
          loading={isLoading}
          size={18}
          aria-label="Loading Spinner"
        />
      )}
    </button>
  );
};

export default CustomButton;
