import type { NextConfig } from "next";
const { i18n } = require("./next-i18next.config");

const nextConfig: NextConfig = {
  // output: "export",
  reactStrictMode: true,
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en"],
    localeDetection: false, // отключаем автоопределение
  },
};

export default nextConfig;
