import { Inter } from "next/font/google";
import styles from "./../styles/Home.module.scss";
import { FaInfoCircle, FaHandsHelping, FaVideo, FaKey } from "react-icons/fa";
import { useRouter } from "next/router";
import Fab from "@/components/common/Fab";
import { IoMail } from "react-icons/io5";
import MainLayout from "@/components/MainLoyout";

const inter = Inter({ subsets: ["latin"] });

const PAGES = [
  { title: "generator", icon: <FaVideo />, path: "/generator", describtion: "Видео иструкции по пользованию приложением" },
  { title: "about", icon: <FaInfoCircle />, path: "/about", describtion: "Информация о сервисе" },
  { title: "support us", icon: <FaHandsHelping />, path: "/support", describtion: "Возможность поблагодарить" },
  { title: "privacy policy", icon: <FaKey />, path: "/policy", describtion: "Конфиденциальность" },
];

const HeaderProps = {
  title: "Проверка автомобиля онлайн — история по VIN и госномеру",
  description:
    "Узнайте всё об автомобиле перед покупкой: история по VIN и номеру, ДТП, пробег, владельцы, ограничения. Бесплатная проверка с расширенным отчётом.",
  keywords:
    "проверка автомобиля онлайн, история авто, проверить машину по vin, проверка по номеру авто, проверка машины перед покупкой, проверка авто бесплатно",
};

export default function Home() {
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
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.hero}>
          <div>
            <h1>Проверка автомобиля онлайн — история по VIN и номеру</h1>
            <h2>Qr code generator - сервис по поиску полезной информации об авто.</h2>
          </div>
        </div>
  
        <div className={styles.grid}>
          {PAGES.map((page) => (
            <div key={page.title} className={styles.card} onClick={() => handleClick(page.path)}>
              <div className={styles.cardIcon}>{page.icon}</div>
              <h2>{page.title}</h2>
              <p>{page.describtion}</p>
            </div>
          ))}
        </div>
        <Fab onClick={() => router.push("/contact")} icon={<IoMail />} />
      </main>
    </MainLayout>
  );
}
