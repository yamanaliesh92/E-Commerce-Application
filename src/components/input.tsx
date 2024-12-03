"use client";

import React, { forwardRef } from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isDescription?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, isDescription, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={props.name}
          className="block text-sm font-medium dark:text-white text-gray-700"
        >
          {label}
        </label>
        <input
          {...props}
          id={props.name}
          ref={ref}
          className={`mt-1  ${
            isDescription ? "h-[70px]" : "h-auto"
          } block w-full ps-3 pe-3 py-2 bg-white border border-gray-300 dark:border-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

export default CustomInput;
