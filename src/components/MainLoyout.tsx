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

const inter = Inter({ subsets: ["latin"] });

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
  image?: string;
}

const defaultMeta = {
  title: "Qr code generator — Удобное авто-приложение",
  description: "Qr code generator — это приложение для получения информации об автомобилях: история, характеристики, данные с госресурсов.",
  image: "/imgs/logo.png",
  keywords: "автомобиль, vin, история авто, проверка авто, госномера, авто Беларусь",
};

const MainLayout = ({ title, description, keywords, children, image }: MainLayoutProps) => {
  const router = useRouter();

  const metaTitle = title || defaultMeta.title;
  const metaDesc = description || defaultMeta.description;
  const metaImage = image || defaultMeta.image;
  const metaKeywords = keywords || defaultMeta.keywords;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metaImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={metaImage} />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <LanguageSwitcher />
        <div className={styles.hero}>
          <div>
            <h1>Проверка автомобиля онлайн — история по VIN и номеру</h1>
            <h2>Qr code generator - сервис по поиску полезной информации об авто.</h2>
          </div>
        </div>
        <div className={`${styles.navigation}`}>
          {router.pathname !== "/" && (
            <Link href="/">
              <Chip>
                <MdOutlineArrowBackIosNew size={24} color="black" />
                back
              </Chip>
            </Link>
          )}
        </div>
        {children}
        <Fab onClick={() => router.push("/contact")} icon={<IoMail />} />
      </main>
    </>
  );
};
export default MainLayout;
