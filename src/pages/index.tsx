import { Inter } from "next/font/google";
import styles from "./../styles/Home.module.scss";
import { FaInfoCircle, FaHandsHelping, FaVideo, FaKey, FaWifi, FaLink } from "react-icons/fa";
import { useRouter } from "next/router";
import Fab from "@/components/common/Fab";
import { IoMail } from "react-icons/io5";
import MainLayout from "@/components/MainLoyout";
import { BsQrCode } from "react-icons/bs";
import { getI18nProps } from "@/lib/withTranslations";
import { useTranslation } from "react-i18next";
import { getHeaderProps } from "@/lib/getHeaderProps";

const inter = Inter({ subsets: ["latin"] });

const PAGES = [
  { title: "link code generator", icon: <BsQrCode />, path: "/link-code-generator" },
  { title: "wi-fi code generator", icon: <BsQrCode />, path: "/wi-fi-code-generator" },
  { title: "qr-code-decoder", icon: <BsQrCode />, path: "/qr-code-decoder" },
  { title: "contact", icon: <FaInfoCircle />, path: "/contact" },
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

  return (
    <MainLayout {...HeaderProps}>
      <div className={styles.grid}>
        {PAGES.map((page) => (
          <div key={page.title} className={styles.card} onClick={() => handleClick(page.path)}>
            <div className={styles.cardIcon}>{page.icon}</div>
            <h2>{page.title}</h2>
          </div>
        ))}
      </div>
      <Fab onClick={() => router.push("/contact")} icon={<IoMail />} />
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default Home;
