"use client";
import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import { useTranslation } from "react-i18next";
import { getI18nProps } from "@/lib/withTranslations";
import QRCodeDecoder from "@/components/Generator/QRCodeDecoder";
import { getHeaderProps } from "@/lib/getHeaderProps";

function QRCodeDecoderPage() {
  const { t } = useTranslation("page");
  const HeaderProps = getHeaderProps(t, "QRCodeDecoder");

  const PageProps = {
    uploadLabel: t("QRCodeDecoder.uploadLabel"),
    decodeBtn: t("QRCodeDecoder.decodeBtn"),
    preview: t("QRCodeDecoder.preview"),
    resultLabel: t("QRCodeDecoder.resultLabel"),
    notFound: t("QRCodeDecoder.notFound"),
  };

  return (
    <MainLayout {...HeaderProps}>
      <main className={styles.main}>
        <h1>{t("QRCodeDecoder.title")}</h1>
        <p>
          {t("QRCodeDecoder.description")}
          {t("QRCodeDecoder.note")}
        </p>
      </main>
      <QRCodeDecoder {...PageProps} />
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default QRCodeDecoderPage;
