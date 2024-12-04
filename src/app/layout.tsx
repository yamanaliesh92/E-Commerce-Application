import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import NextIntlProvider from "@/provider/nextIntlProvider";
import ReduxProviders from "@/provider/ReduxProviders";
import { ToastProvider } from "@/provider/toastProvider";
import Navbar from "@/components/layout/navbar";
import ThemeSwitch from "@/components/ThemeSwitch";

export const metadata: Metadata = {
  title: "E-commerce App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html dir={dir} lang={locale}>
      <body>
        <NextIntlProvider>
          <ReduxProviders>
            <Navbar />
            <ThemeSwitch />
            <ToastProvider />
            <div className="mt-[64px] bg-white dark:bg-black">{children}</div>
          </ReduxProviders>
        </NextIntlProvider>
      </body>
    </html>
  );
}
