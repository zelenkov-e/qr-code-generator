"use client";
import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import { useTranslation } from "react-i18next";
import { getI18nProps } from "@/lib/withTranslations";
import { getHeaderProps } from "@/lib/getHeaderProps";
import BarCodeScanner from "@/components/BarCodeScanner";

function BarCodeScannerPage() {
  const { t } = useTranslation("page");
  const HeaderProps = getHeaderProps(t, "BarCodeScannerPage");

  const PageProps = {
    stopScan: t("BarCodeScannerPage.stopScan"),
    startScan: t("BarCodeScannerPage.startScan"),
    note: t("BarCodeScannerPage.note"),
    iframeMessage: t("BarCodeScannerPage.iframeMessage"),
  };

  return (
    <MainLayout {...HeaderProps}>
      <main className={styles.main}>
        <h1>{t("BarCodeScannerPage.title")}</h1>
        <p>{t("BarCodeScannerPage.description")}</p>
      </main>
      <BarCodeScanner {...PageProps} />
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default BarCodeScannerPage;
