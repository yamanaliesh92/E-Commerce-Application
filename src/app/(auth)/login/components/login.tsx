"use client";
import { useState } from "react";
import * as zod from "zod";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import CustomInput from "@/components/custom/input";
import CustomButton from "@/components/custom/button";

export default function Login() {
  const { formatMessage } = useIntl();

  const loginSchema = zod.object({
    email: zod.string().email(formatMessage({ id: "validation.invalidEmail" })),
    password: zod
      .string()
      .min(6, formatMessage({ id: "validation.passwordMinLength" })),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: zod.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      await axios.post("/api/user/login", data);
      setIsLoading(false);
      router.push("/");
      router.refresh();
      toast.success(formatMessage({ id: "user.createdSuccess" }));
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
      <h2 className="text-2xl font-bold mb-5 text-primary">
        {formatMessage({ id: "login.signInButton" })}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <CustomInput
            label={formatMessage({ id: "login.emailLabel" })}
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="mb-4 relative">
          <CustomInput
            label={formatMessage({ id: "login.passwordLabel" })}
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
          {formatMessage({ id: "login.signInButton" })}
        </CustomButton>
      </form>
      <p className="text-sm text-center mt-4 dark:text-white text-gray-600">
        {formatMessage({ id: "login.dontHaveAccount" })}{" "}
        <Link
          href={"/sign-up"}
          className="text-primary dark:text-secondary ms-2"
        >
          {formatMessage({ id: "login.signUpLink" })}
        </Link>
      </p>
    </div>
  );
}
