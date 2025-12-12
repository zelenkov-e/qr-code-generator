"use client";
import { Inter } from "next/font/google";
import styles from "./../styles/Home.module.scss";
import { FaInfoCircle, FaHandsHelping, FaImage, FaKey, FaWifi, FaLink } from "react-icons/fa";
import { MdEventAvailable, MdQrCodeScanner } from "react-icons/md";
import { useRouter } from "next/router";
import Fab from "@/components/common/Fab";
import { IoMail } from "react-icons/io5";
import MainLayout from "@/components/MainLoyout";
import { getI18nProps } from "@/lib/withTranslations";
import { useTranslation } from "react-i18next";
import { getHeaderProps } from "@/lib/getHeaderProps";

const inter = Inter({ subsets: ["latin"] });

const PAGES = [
  { title: "qr-code / bar-code scanner", icon: <MdQrCodeScanner />, path: "/bar-code-scanner" },
  { title: "link qr-code generator", icon: <FaLink />, path: "/link-code-generator" },
  { title: "wi-fi gr-code generator", icon: <FaWifi />, path: "/wi-fi-code-generator" },
  { title: "qr-code event", icon: <MdEventAvailable />, path: "/qr-code-event" },
  { title: "qr-code decoder", icon: <FaImage />, path: "/qr-code-decoder" },
];

const FOOTER_PAGES = [
  { title: "about", icon: <FaInfoCircle />, path: "/about" },
  { title: "support us", icon: <FaHandsHelping />, path: "/support" },
  { title: "privacy policy", icon: <FaKey />, path: "/policy" },
];

function Home() {
  const { t } = useTranslation("page");
  const HeaderProps = getHeaderProps(t, "home");

  const router = useRouter();

  const handleClick = (path: string) => {
    const eventName = path.replace(/^\//, "");

    if (typeof window !== "undefined" && (window as any).umami) {
      (window as any).umami.track(eventName);
    }

    router.push(path);
  };

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  };

  const filteredPages = PAGES.filter((page) => {
    if (page.path === "/bar-code-scanner") {
      return isMobile();
    }
    return true;
  });

  return (
    <MainLayout {...HeaderProps}>
      <div className={styles.hero}>
        <div>
          <h1>Generate multiple QR codes online</h1>
        </div>
      </div>
      <div className={styles.grid}>
        {filteredPages.map((page) => (
          // {PAGES.map((page) => (
          <div key={page.title} className={styles.card} onClick={() => handleClick(page.path)}>
            <div className={styles.cardIcon}>{page.icon}</div>
            <h2>{page.title}</h2>
          </div>
        ))}
      </div>

      <div className={styles.footerTabs}>
        {FOOTER_PAGES.map((page) => (
          <div key={page.title} className={styles.tabCard} onClick={() => handleClick(page.path)}>
            <div className={styles.tabIcon}>{page.icon}</div>
            {/* <span>{page.title}</span> */}
          </div>
        ))}
      </div>
      <Fab onClick={() => router.push("/contact")} icon={<IoMail />} />
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default Home;
