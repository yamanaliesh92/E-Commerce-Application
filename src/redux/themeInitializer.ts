"use client";
import { toggleTheme } from "@/redux/theme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ThemeInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.classList.add(storedTheme);
      if (storedTheme === "dark") {
        dispatch(toggleTheme());
      }
    }
  }, [dispatch]);

  return null;
};

export default ThemeInitializer;
