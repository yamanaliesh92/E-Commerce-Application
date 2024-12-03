"use client";

import { IntlProvider } from "react-intl";
import { useSearchParams } from "next/navigation";
import enMessages from "../../public/locales/en/common.json";
import arMessages from "../../public/locales/ar/common.json";
import React from "react";

const messages = {
  en: enMessages,
  ar: arMessages,
};

type Local = "en" | "ar";

const NextIntlProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const locale = (searchParams.get("locale") || "en") as Local;
  const currentMessages = messages[locale] || messages.en;

  return (
    <IntlProvider locale={locale} messages={currentMessages}>
      {children}
    </IntlProvider>
  );
};

export default NextIntlProvider;
