"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

const LanguageSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { formatMessage } = useIntl();
  const [currentLocale, setCurrentLocale] = useState(
    Cookies.get("NEXT_LOCALE") || "en"
  );

  useEffect(() => {
    setIsMounted(true);
    const locale = Cookies.get("NEXT_LOCALE") || "en";
    setCurrentLocale(locale);
  }, []);

  if (!isMounted) {
    return null;
  }

  const switchLocale = (locale: string) => {
    Cookies.set("NEXT_LOCALE", locale);

    const currentPath = window.location.pathname;
    const newUrl = new URL(currentPath, window.location.origin);
    newUrl.searchParams.set("locale", locale);
    window.location.href = newUrl.toString();
  };

  const locales = [
    { code: "en", name: formatMessage({ id: "languageSwitcher.english" }) },
    { code: "ar", name: formatMessage({ id: "languageSwitcher.arabic" }) },
  ];

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={(e) => switchLocale(e.target.value)}
        className="p-2 ps-6 pe-6 rounded-lg border-2 border-gray-400 dark:border-white bg-transparent text-black dark:text-white outline-none transition duration-300"
      >
        {locales.map((locale) => (
          <option
            className="hover:bg-gray-500 dark:text-black"
            key={locale.code}
            value={locale.code}
          >
            {locale.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
