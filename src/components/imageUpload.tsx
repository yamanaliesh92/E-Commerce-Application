"use client";
import { FaTrash, FaPlus } from "react-icons/fa";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useIntl } from "react-intl";

interface UploadImageProps {
  value: string;
  disabled?: boolean;
  onRemove: () => void;
  onChange: (value: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
}: UploadImageProps) {
  const { formatMessage } = useIntl();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const onUpload = (result: any) => {
    console.log("onUpload done", result);
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <CldUploadWidget uploadPreset="j0am2dyf" onSuccess={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <button
              disabled={disabled}
              type="button"
              onClick={onClick}
              className="bg-gray-700 dark:bg-white dark:text-black text-white ps-4 pe-4 py-2 rounded-lg transition duration-300 flex items-center gap-2"
            >
              <FaPlus className="w-4 h-4" />
              {formatMessage({ id: "imageUpload.uploadImage" })}
            </button>
          );
        }}
      </CldUploadWidget>

      <div className="flex  items-center gap-4">
        {value && (
          <div className="relative rounded-md overflow-hidden">
            <div className="z-10 absolute top-[0px] end-[-5px]">
              <button
                type={"button"}
                onClick={onRemove}
                className="bg-red-500 p-1 rounded-full"
              >
                <FaTrash className="h-4 w-4" />
              </button>
            </div>
            <Image
              alt="Image"
              width={200}
              height={200}
              className="h-[50px] w-[50px] rounded-full object-cover"
              src={value}
            />
          </div>
        )}
      </div>
    </div>
  );
}
