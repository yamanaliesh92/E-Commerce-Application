"use client";
import ThemeInitializer from "@/components/themeInitializer";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";

const ReduxProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeInitializer />
      {children}
    </Provider>
  );
};

export default ReduxProviders;
