import type { AppProps } from "next/app";
import { ToastProvider } from "@/context/ToastContext";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
