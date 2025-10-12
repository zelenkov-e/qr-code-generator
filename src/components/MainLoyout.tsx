"use client";
import Link from "next/link";
import Chip from "./common/Chip";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Inter } from "next/font/google";
import Fab from "./common/Fab";
import { IoMail } from "react-icons/io5";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./../styles/Home.module.scss";
import LanguageSwitcher from "./LanguageSwitcher";
import { getI18nProps } from "@/lib/withTranslations";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
  image?: string;
}

const MainLayout = ({ title, description, keywords, children, image }: MainLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation("page");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {router.pathname !== "/" && (
          <div className={`${styles.navigation}`}>
            <Fragment>
              <LanguageSwitcher />
              <Link href="/">
                <Chip>
                  <MdOutlineArrowBackIosNew size={24} color="black" />
                  back
                </Chip>
              </Link>
            </Fragment>
          </div>
        )}

        {children}
        <Fab onClick={() => router.push("/contact")} icon={<IoMail />} />
      </main>
    </>
  );
};

export default MainLayout;
