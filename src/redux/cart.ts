import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IResponseCart {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
}

export interface ICart {
  cartItem: IResponseCart[];
}

const local = typeof window !== "undefined" ? window.localStorage : null;

const cartFromLocalStorage: IResponseCart[] = local?.getItem("cartItem")
  ? JSON.parse(local?.getItem("cartItem")!)
  : [];

const init: ICart = {
  cartItem: cartFromLocalStorage,
};

const cart = createSlice({
  name: "cart",
  initialState: init,
  reducers: {
    addToCart: (state, action: PayloadAction<IResponseCart>) => {
      const newItem = action.payload;
      const existItem = state.cartItem.find((item) => item.id === newItem.id);

      if (existItem) {
        existItem.quantity++;
      } else {
        state.cartItem.push({ ...newItem, quantity: 1 });
      }

      local?.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload.id;
      const updateState = state.cartItem.filter((item) => item.id !== id);
      state.cartItem.splice(0, state.cartItem.length, ...updateState);

      local?.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.cartItem.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else {
        state.cartItem = state.cartItem.filter((item) => item.id !== id);
      }
      local?.setItem("cartItem", JSON.stringify(state.cartItem));
    },
  },
});

export default cart.reducer;
export const { addToCart, removeFromCart, updateQuantity } = cart.actions;
