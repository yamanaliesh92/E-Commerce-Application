import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex dark:bg-black items-center justify-center  h-[100vh] w-[100vw]">
      {children}
    </div>
  );
}
