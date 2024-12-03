"use client";

import { useDebounce } from "@/hooks/useDebunce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useIntl } from "react-intl";

export default function SearchInput() {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      queryParams.set("title", debouncedValue);
    } else {
      queryParams.delete("title");
    }

    const url = `${pathName}?${queryParams.toString()}`;
    router.push(url);
  }, [debouncedValue, searchParams, router, pathName]);

  return (
    <div className="relative mt-2 gap-[10px]">
      <FaSearch className="h-4 w-4 absolute top-3 start-3 text-black dark:text-white" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={formatMessage({ id: "search.placeholder" })}
        className="w-full h-[45px] md:w-[300px] dark:border-white placeholder:dark:text-white placeholder:text-black ps-9 rounded-full bg-slate-300 dark:bg-gray-700 focus-visible:ring-slate-200"
      />
    </div>
  );
}
