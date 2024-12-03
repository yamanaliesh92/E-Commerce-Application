"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import Button from "../custom/button";

export default function DeleteModal({
  setOpen,
  id,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { formatMessage } = useIntl();
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/product/${id}`);
      setIsLoading(false);
      toast.success(formatMessage({ id: "deleteModal.done" }));
      router.refresh();
      setOpen(false);
    } catch (err) {
      console.error("Error creating product", err);
      toast.error(formatMessage({ id: "productForm.errorCreatingProduct" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-0 p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {formatMessage({ id: "deleteModal.areYouSure" })}
        </h2>
        <p className="mt-2 text-gray-600">
          {formatMessage({ id: "deleteModal.confirmDelete" })}
        </p>
        <div className="mt-4 flex justify-end space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setOpen(false)}
            className="py-2 ps-4 pe-4 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
          >
            {formatMessage({ id: "deleteModal.cancel" })}
          </button>
          <Button
            width="auto"
            type="submit"
            isLoading={isLoading}
            bgColor="bg-destructive "
            onClick={onSubmit}
          >
            {formatMessage({ id: "deleteModal.delete" })}
          </Button>
        </div>
      </div>
    </div>
  );
}
