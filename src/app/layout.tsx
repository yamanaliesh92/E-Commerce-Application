import Navbar from "@/components/navbar";
import NextIntlProvider from "@/components/nextIntlProvider";
import Providers from "@/redux/provider";
import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import ThemeSwitch from "@/components/ThemeSwitch";
import { ToastProvider } from "@/components/toast-provider";

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
          <Providers>
            <Navbar />
            <ThemeSwitch />
            <ToastProvider />
            <div className="mt-[64px] bg-white dark:bg-black">{children}</div>
          </Providers>
        </NextIntlProvider>
      </body>
    </html>
  );
}
