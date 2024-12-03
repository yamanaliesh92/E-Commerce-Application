import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";

      console.log("Action", state.theme);
      if (state.theme === "dark") {
        window.localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        window.localStorage.setItem("theme", "light");
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
