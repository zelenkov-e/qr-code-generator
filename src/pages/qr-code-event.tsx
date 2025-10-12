import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import EventQRGenerator from "@/components/Generator/EventGenerator";
import { useTranslation } from "react-i18next";
import { getI18nProps } from "@/lib/withTranslations";
import { getHeaderProps } from "@/lib/getHeaderProps";

function QrCodeEventPage() {
  const { t } = useTranslation("page");
  const HeaderProps = getHeaderProps(t, "eventCodeGenerator");

  const PageProps = {
    preview: t("eventCodeGenerator.preview"),
    uploadLogo: t("eventCodeGenerator.uploadLogo"),
    inputLabel: t("eventCodeGenerator.inputLabel"),
    resetBtn: t("eventCodeGenerator.resetBtn"),
    generateBtn: t("eventCodeGenerator.generateBtn"),
    downloadBtn: t("eventCodeGenerator.downloadBtn"),
    downloadAllBtn: t("eventCodeGenerator.downloadAllBtn"),
    noEvents: t("eventCodeGenerator.noEvents"),
    noQRs: t("eventCodeGenerator.noQRs"),
    placeholders: {
      summary: t("eventCodeGenerator.placeholders.summary"),
      start: t("eventCodeGenerator.placeholders.start"),
      end: t("eventCodeGenerator.placeholders.end"),
      location: t("eventCodeGenerator.placeholders.location"),
      description: t("eventCodeGenerator.placeholders.description"),
    },
  };

  return (
    <MainLayout {...HeaderProps}>
      <main className={styles.main}>
        <h1>{t("eventCodeGenerator.title")}</h1>
        <p>{t("eventCodeGenerator.description")}</p>
      </main>
      <EventQRGenerator {...PageProps} />
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default QrCodeEventPage;
