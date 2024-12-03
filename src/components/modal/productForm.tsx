"use client";
import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useIntl } from "react-intl";

import { FaTimes } from "react-icons/fa";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useFetchUser from "@/hooks/useFetchUser";
import CustomInput from "../custom/input";
import ImageUpload from "../imageUpload";
import Button from "../custom/button";

interface IProductForm {
  type: "update" | "create";
  data?: any;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductForm = ({ type, data, setOpen }: IProductForm) => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const user = useFetchUser();

  const productSchema = z.object({
    name: z.string().min(1, formatMessage({ id: "productForm.nameRequired" })),
    description: z
      .string()
      .min(1, formatMessage({ id: "productForm.descriptionRequired" })),
    price: z
      .number()
      .positive(formatMessage({ id: "productForm.pricePositive" })),
    imageUrl: z.string().url(formatMessage({ id: "productForm.invalidUrl" })),
  });

  const title =
    type === "create"
      ? formatMessage({ id: "productForm.create" })
      : formatMessage({ id: "productForm.update" });

  type ProductFormInputs = z.infer<typeof productSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: data,
  });

  const onSubmit = async (formData: ProductFormInputs) => {
    try {
      if (type === "create") {
        setIsLoading(true);
        await axios.post("/api/product", { ...formData, userId: user?.id });
        setIsLoading(false);
        toast.success(formatMessage({ id: "productForm.productCreated" }));
        router.refresh();
        router.push("/");
      } else {
        setIsLoading(true);
        await axios.patch(`/api/product/${data.id}`, formData);
        toast.success(formatMessage({ id: "productForm.productUpdated" }));
        setIsLoading(false);
        router.refresh();
        setOpen && setOpen(false);
      }
    } catch (err) {
      console.error("Error creating product", err);
      toast.error(formatMessage({ id: "productForm.unknownError" }));
    } finally {
      setIsLoading(false);
    }
  };

  const currentValue = useWatch({ control });

  const isChanged =
    type === "update" &&
    (currentValue.name !== data.name ||
      currentValue.price !== data.price ||
      currentValue.description !== data.description! ||
      currentValue.imageUrl !== data.imageUrl);

  const disabled = type === "create" ? !isValid : !isValid || !isChanged;

  return (
    <div className="flex items-center justify-center z-[999] h-[100vh] fixed inset-0 w-full bg-black bg-opacity-50">
      <div className="p-6 w-[500px] bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <div className="flex justify-between mb-3">
          <h2 className="text-2xl dark:text-white font-bold">{title}</h2>
          {type === "create" ? (
            <Link href={"/"}>
              <FaTimes className="dark:text-white" size={20} />
            </Link>
          ) : (
            <FaTimes
              onClick={() => setOpen && setOpen(false)}
              className="dark:text-white"
              size={20}
            />
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <CustomInput
              {...register("name")}
              label={formatMessage({ id: "productForm.name" })}
              error={errors.name?.message}
            />
          </div>
          <div>
            <CustomInput
              {...register("description")}
              label={formatMessage({ id: "productForm.description" })}
              error={errors.name?.message}
              isDescription={true}
            />
          </div>
          <div>
            <CustomInput
              {...register("price", { valueAsNumber: true })}
              label={formatMessage({ id: "productForm.price" })}
              error={errors.price?.message}
            />
          </div>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value as any}
                onChange={field.onChange}
                onRemove={() => field.onChange("")}
                disabled={false}
              />
            )}
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}

          <Button disabled={disabled} isLoading={isLoading} type="submit">
            {title}
          </Button>
        </form>
      </div>
    </div>
  );
};
