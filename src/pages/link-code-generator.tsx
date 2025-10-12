"use client";
import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import LinkGenerator from "@/components/Generator/LinkGenerator";
import { useTranslation } from "react-i18next";
import { getI18nProps } from "@/lib/withTranslations";
import { getHeaderProps } from "@/lib/getHeaderProps";

function LinkCodeGeneratorPage() {
  const { t } = useTranslation("page");
  const HeaderProps = getHeaderProps(t, "linkCodeGenerator");

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
  };

  return (
    <MainLayout {...HeaderProps}>
      <main className={styles.main}>
        <h1>{t("linkCodeGenerator.title")}</h1>
        <p>
          {t("linkCodeGenerator.description")}
          {t("linkCodeGenerator.note")}
        </p>
      </main>
      <LinkGenerator {...PageProps} />
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default LinkCodeGeneratorPage;
