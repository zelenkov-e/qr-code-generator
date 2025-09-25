import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import LinkGenerator from "@/components/Generator/LinkGenerator";
import { useTranslation } from "react-i18next";
import { getI18nProps } from "@/lib/withTranslations";
import QRCodeDecoder from "@/components/Generator/QRCodeDecoder";

const HeaderProps = {
  title: "О приложении Info4cars — Полная информация об автомобилях по VIN и госномеру",
  description:
    "Узнайте, как Info4cars помогает автовладельцам получать важную информацию об автомобилях: история эксплуатации, характеристики, техобслуживание, проверки по VIN и госномеру. Бесплатно для зарегистрированных пользователей.",
  keywords:
    "Info4cars, проверка авто, VIN, госномер, история автомобиля, техобслуживание, ДТП, доверенность, угон, исполнительные документы, регистрация авто",
};

function LinkCodeGeneratorPage() {
  const { t } = useTranslation("page");
  const PageProps = {};

  return (
    <MainLayout {...HeaderProps}>
      <main className={styles.main}>
        {/* <h1>{t("linkCodeGenerator.title")}</h1> */}
        {/* <p>
          {t("linkCodeGenerator.description")}
          {t("linkCodeGenerator.note")}
        </p> */}
      </main>
      <QRCodeDecoder />
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default LinkCodeGeneratorPage;
