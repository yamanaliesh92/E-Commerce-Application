module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
};

export {};
