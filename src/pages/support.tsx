import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import Image from "next/image";
import qrCodeImage from "../../public/imgs/qr-code-payments.png";
import Separator from "@/components/common/Separator";
import { useTranslation } from "react-i18next";
import { getI18nProps } from "@/lib/withTranslations";
import { getHeaderProps } from "@/lib/getHeaderProps";

function SupportUsPage() {
  const { t } = useTranslation("page");
  const HeaderProps = getHeaderProps(t, "support");
  return (
    <MainLayout {...HeaderProps}>
      <main className={`${styles.main}`}>
        <h3>
          <b>{t("support.title")}</b>
        </h3>

        <div>{t("support.donation1")}</div>
        <div>{t("support.donation2")}</div>

        <div>
          <b>{t("support.paymentTitle")}</b>
          <div>{t("support.paymentInstruction")}</div>
        </div>

        <div>
          <b>{t("support.qrInstruction")}</b>
        </div>

        <Image alt="logo" src={qrCodeImage} />
        <Separator size="large" />
      </main>
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default SupportUsPage;
