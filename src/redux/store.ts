import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme";
import cart, { ICart } from "./cart";

export interface IRedux {
  cart: ICart;
}

const Store = configureStore({
  reducer: {
    cart: cart,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;

export default Store;
