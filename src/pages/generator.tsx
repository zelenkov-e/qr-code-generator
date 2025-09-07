import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import Separator from "@/components/common/Separator";
import Chip from "@/components/common/Chip";
import { FaAndroid } from "react-icons/fa";
import BulkQRGenerator from "@/components/Generator/index.";


const HeaderProps = {
  title: "О приложении Info4cars — Полная информация об автомобилях по VIN и госномеру",
  description:
    "Узнайте, как Info4cars помогает автовладельцам получать важную информацию об автомобилях: история эксплуатации, характеристики, техобслуживание, проверки по VIN и госномеру. Бесплатно для зарегистрированных пользователей.",
  keywords:
    "Info4cars, проверка авто, VIN, госномер, история автомобиля, техобслуживание, ДТП, доверенность, угон, исполнительные документы, регистрация авто",
};

export default function GeneratorPage() {
  return (
    <MainLayout {...HeaderProps}>
      <div className={styles.about}>
        <div>
          <p>
            qr-code-generator — это удобное и функциональное приложение, которое помогает владельцам автомобилей получать важные сведения о своем транспортном
            средстве. С его помощью можно быстро найти данные о характеристиках, истории эксплуатации, техническом обслуживании и других аспектах,
            связанных с автомобилем..
          </p>
        </div>
      </div>
      <main className={`${styles.main} `}>
         <BulkQRGenerator/>
     </main>
    </MainLayout>
  );
}
