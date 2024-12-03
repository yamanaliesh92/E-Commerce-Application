"use client";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, SetStateAction, FC } from "react";
import { FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { IResponseCart, removeFromCart, updateQuantity } from "@/redux/cart";
import Button from "./button";
import Image from "next/image";
import { useIntl } from "react-intl";
import axios from "axios";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Cart: FC<IProps> = ({ setOpen }) => {
  const dispatch = useDispatch();
  const cart = useSelector(
    (state: { cart: { cartItem: IResponseCart[] } }) => state.cart.cartItem
  );
  const { formatMessage } = useIntl();

  const removeCart = (id: number) => {
    dispatch(removeFromCart({ id }));
    toast.error(formatMessage({ id: "cart.itemRemoved" }));
  };

  const onCheckout = async () => {
    const response = await axios.post("api/checkout", {
      productIds: cart.map((item) => item.id),
    });
    window.location = response.data.url;
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const totalPrice = cart.reduce(
    (total: number, item: IResponseCart) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 h-full z-[999] fixed right-0 top-0 overflow-y-auto w-[500px] dark:bg-gray-700 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl dark:text-white font-bold mb-4">
          {formatMessage({ id: "cart.yourCart" })}
        </h1>
        <button onClick={() => setOpen(false)}>
          <FaTimes className="dark:text-white" size={20} />
        </button>
      </div>

      {cart.length === 0 && (
        <p className="dark:text-white text-center text-gray-700 my-4">
          {formatMessage({ id: "cart.noProduct" })}
        </p>
      )}

      {cart.map((item: IResponseCart) => (
        <div
          key={item.id}
          className="flex justify-between gap-4 items-center p-4 border-b mb-4"
        >
          <Image
            src={item.imageUrl}
            width={100}
            height={100}
            alt={item.name}
            className="w-20 h-20 object-contain rounded"
          />
          <div className="flex-1 ml-4">
            <h3 className="text-xl text-black dark:text-white font-bold">
              {item.name}
            </h3>
            <p className="text-green-500">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <FaMinus
              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              className="dark:text-white"
              size={15}
            />

            <span className=" text-black dark:text-white">{item.quantity}</span>

            <FaPlus
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              className="dark:text-white"
              size={15}
            />
          </div>
          <button
            onClick={() => removeCart(item.id)}
            className="text-red-500 p-2"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <div className="flex justify-between mt-4 mb-2">
        <h3 className="text-xl dark:text-white font-bold">
          {formatMessage({ id: "cart.totalPrice" })}
        </h3>
        <p className="text-xl dark:text-white font-semibold">
          ${totalPrice.toFixed(2)}
        </p>
      </div>
      <Button onClick={onCheckout}>
        {formatMessage({ id: "cart.checkout" })}
      </Button>
    </div>
  );
};

export default Cart;
