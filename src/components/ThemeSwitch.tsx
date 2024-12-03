"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { BsMoon, BsSun } from "react-icons/bs";
import { toggleTheme } from "@/redux/theme";

export default function ThemeSwitch() {
  const theme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <button
      className="fixed z-[999] bottom-5 end-5  w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-500"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
