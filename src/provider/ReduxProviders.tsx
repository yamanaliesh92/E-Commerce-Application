"use client";

import store from "@/redux/store";
import ThemeInitializer from "@/redux/themeInitializer";
import { Provider } from "react-redux";

const ReduxProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeInitializer />
      {children}
    </Provider>
  );
};

export default ReduxProviders;
