"use client";
import React from "react";
import { useIntl } from "react-intl";

const NoProductsFound: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="flex flex-col h-[100vh] items-center justify-center mt-20">
      <h2 className="text-2xl font-bold dark:text-white text-gray-700 mb-4">
        {formatMessage({ id: "noProductsFound.title" })}
      </h2>
      <p className="text-gray-600 dark:text-white">
        {formatMessage({ id: "noProductsFound.message" })}
      </p>
    </div>
  );
};

export default NoProductsFound;
