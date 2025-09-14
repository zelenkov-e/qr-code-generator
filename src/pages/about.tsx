import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import { getI18nProps } from "@/lib/withTranslations";
import { useTranslation } from "react-i18next";

const HeaderProps = {
  title: "О приложении Info4cars — Полная информация об автомобилях по VIN и госномеру",
  description:
    "Узнайте, как Info4cars помогает автовладельцам получать важную информацию об автомобилях: история эксплуатации, характеристики, техобслуживание, проверки по VIN и госномеру. Бесплатно для зарегистрированных пользователей.",
  keywords:
    "Info4cars, проверка авто, VIN, госномер, история автомобиля, техобслуживание, ДТП, доверенность, угон, исполнительные документы, регистрация авто",
};

function AboutPage() {
  const { t } = useTranslation("page");

  return (
    <MainLayout {...HeaderProps}>
      <main className={`${styles.main} `}>
        <h1>{t("about.featuresTitle")}</h1>
        <p>{t("about.intro")}</p>
        <p>{t("about.registeredUsers")}</p>

        <ul>
          <li>
            <strong>{t("about.features.bulkGeneration")}</strong>
          </li>
          <li>
            <strong>{t("about.features.customLabel")}</strong>
          </li>
          <li>
            <strong>{t("about.features.infoSearch")}</strong>
          </li>
          <li>
            <strong>{t("about.features.history")}</strong>
          </li>
        </ul>
      </main>
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default AboutPage;
