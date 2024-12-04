"use client";

import React from "react";
import Link from "next/link";
import { useIntl } from "react-intl";

export default function NotFoundPage() {
  const { formatMessage } = useIntl();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold dark:text-white mb-4">
          {formatMessage({
            id: "notFound",
          })}
        </h1>
        <p className="text-gray-600 mb-6 dark:text-white">
          {formatMessage({
            id: "notFoundMessage",
          })}
        </p>
        <Link className="dark:to-secondary text-primary font-bold" href="/">
          {formatMessage({ id: "backToHome" })}
        </Link>
      </div>
    </div>
  );
}
