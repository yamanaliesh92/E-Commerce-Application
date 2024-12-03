"use client";
import { addToCart } from "@/redux/cart";
import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useIntl } from "react-intl";

import useFetchUser from "@/hooks/useFetchUser";
import toast from "react-hot-toast";
import { ProductForm } from "./modal/productForm";
import DeleteModal from "./modal/deleteModal";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    userId: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [openEditModel, setOpenEditModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const user = useFetchUser();

  const addCart = () => {
    dispatch(
      addToCart({
        description: product.description,
        imageUrl: product.imageUrl,
        id: product.id,
        price: product.price,
        name: product.name,
        quantity: 1,
      })
    );
    toast.success(formatMessage({ id: "cart.itemAdded" }));
  };

  const truncateDescription = (desc: string, maxLength: number) => {
    if (desc.length <= maxLength) {
      return desc;
    }
    return `${desc.substring(0, maxLength)}...`;
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 relative">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl dark:text-white font-bold">{product.name}</h3>
        <p className="text-gray-700 dark:text-yellow-50 h-[45px] mt-2">
          {truncateDescription(product.description, 100)}
        </p>
        <p className="text-green-500 text-lg font-semibold mt-2">
          ${product.price}
        </p>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            {user?.id === product.userId && (
              <>
                <button
                  onClick={() => setOpenDeleteModal(true)}
                  className="bg-red-500 p-2 rounded-full text-white"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpenEditModel((prev) => !prev)}
                  className="bg-gray-500 dark:bg-white p-2 rounded-full dark:text-black text-white"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
          <button
            onClick={addCart}
            className="text-blue-500 dark:bg-white  p-2 rounded-full"
          >
            <FaCartPlus className="w-6 h-6" />
            <span className="sr-only">
              {formatMessage({ id: "productCard.addToCart" })}
            </span>
          </button>
        </div>
      </div>
      {openEditModel && (
        <ProductForm type="update" setOpen={setOpenEditModel} data={product} />
      )}
      {openDeleteModal && (
        <DeleteModal id={product.id} setOpen={setOpenDeleteModal} />
      )}
    </div>
  );
};

export default ProductCard;
