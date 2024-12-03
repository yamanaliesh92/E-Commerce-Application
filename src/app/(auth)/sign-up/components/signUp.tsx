"use client";
import { useState } from "react";
import * as zod from "zod";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import CustomInput from "@/components/custom/input";
import CustomButton from "@/components/custom/button";

export default function SignUp() {
  const { formatMessage } = useIntl();

  const signUpSchema = zod.object({
    email: zod.string().email(formatMessage({ id: "validation.invalidEmail" })),
    username: zod
      .string()
      .min(1, formatMessage({ id: "validation.usernameRequired" })),
    password: zod
      .string()
      .min(6, formatMessage({ id: "validation.passwordMinLength" })),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<zod.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: zod.infer<typeof signUpSchema>) => {
    try {
      setIsLoading(true);
      await axios.post("/api/user", data);
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      toast.error(formatMessage({ id: "productForm.unknownError" }));
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-5 dark:text-white text-primary">
        {formatMessage({ id: "signUp.signUpButton" })}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <CustomInput
            label={formatMessage({ id: "signUp.usernameLabel" })}
            {...register("username")}
            error={errors.username?.message}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label={formatMessage({ id: "signUp.emailLabel" })}
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="mb-4 relative">
          <CustomInput
            label={formatMessage({ id: "signUp.passwordLabel" })}
            {...register("password")}
            error={errors.password?.message}
            type={showPassword ? "text" : "password"}
          />
          {!showPassword ? (
            <AiFillEye
              onClick={togglePasswordVisibility}
              cursor={"pointer"}
              size={20}
              className="absolute top-9 end-3"
            />
          ) : (
            <AiFillEyeInvisible
              onClick={togglePasswordVisibility}
              cursor={"pointer"}
              size={20}
              className="absolute top-9 end-3"
            />
          )}
        </div>

        <CustomButton isLoading={isLoading} type="submit">
          {formatMessage({ id: "signUp.signUpButton" })}
        </CustomButton>
      </form>
      <p className="mt-4 text-sm text-center dark:text-white text-gray-700">
        {formatMessage({ id: "signUp.alreadyHaveAccount" })}
        <Link
          href={"/login"}
          className="text-primary dark:text-secondary ms-2 hover:underline"
        >
          {formatMessage({ id: "signUp.loginLink" })}
        </Link>
      </p>
    </div>
  );
}
