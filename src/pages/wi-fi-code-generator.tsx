import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import WifiGenerator from "@/components/Generator/WifiGenerator";
import { getI18nProps } from "@/lib/withTranslations";
import { useTranslation } from "react-i18next";

const HeaderProps = {
  title: "О приложении Info4cars — Полная информация об автомобилях по VIN и госномеру",
  description:
    "Узнайте, как Info4cars помогает автовладельцам получать важную информацию об автомобилях: история эксплуатации, характеристики, техобслуживание, проверки по VIN и госномеру. Бесплатно для зарегистрированных пользователей.",
  keywords:
    "Info4cars, проверка авто, VIN, госномер, история автомобиля, техобслуживание, ДТП, доверенность, угон, исполнительные документы, регистрация авто",
};

function WifiCodeGeneratorPage() {
  const { t } = useTranslation("page");
  const PageProps = {
    preview: t("linkCodeGenerator.preview"),
    uploadLogo: t("linkCodeGenerator.uploadLogo"),
    inputLabel: t("linkCodeGenerator.inputLabel"),
    resetBtn: t("linkCodeGenerator.resetBtn"),
    downloadAllBtn: t("linkCodeGenerator.downloadAllBtn"),
    generateBtn: t("linkCodeGenerator.generateBtn"),
    downloadBtn: t("linkCodeGenerator.downloadBtn"),
    noLinks: t("linkCodeGenerator.noLinks"),
    noQRs: t("linkCodeGenerator.noQRs"),
    limit: t("linkCodeGenerator.limit"),
    hiddenNetwork: t("linkCodeGenerator.hiddenNetwork"),
    removeBtn: t("linkCodeGenerator.removeBtn"),
  };
  return (
    <MainLayout {...HeaderProps}>
      <main className={styles.main}>
        <h1>{t("wifiCodeGenerator.title")}</h1>
        <p>
          {t("wifiCodeGenerator.description")} {t("wifiCodeGenerator.note")}
        </p>
      </main>
      <WifiGenerator {...PageProps} />
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default WifiCodeGeneratorPage;
