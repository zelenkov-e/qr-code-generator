"use client";
import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import WifiGenerator from "@/components/Generator/WifiGenerator";
import { getI18nProps } from "@/lib/withTranslations";
import { useTranslation } from "react-i18next";
import { getHeaderProps } from "@/lib/getHeaderProps";

function WifiCodeGeneratorPage() {
  const { t } = useTranslation("page");
  const HeaderProps = getHeaderProps(t, "wifiCodeGenerator");

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
