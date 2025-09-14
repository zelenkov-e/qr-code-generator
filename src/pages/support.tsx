import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import Image from "next/image";
import qrCodeImage from "../../public/imgs/qr-code-payments.png";
import Separator from "@/components/common/Separator";
import { useTranslation } from "react-i18next";
import { getI18nProps } from "@/lib/withTranslations";

const HeaderProps = {
  title: "Поддержать Info4cars — Помогите развитию проекта",
  description:
    "Поддержите проект Info4cars. Ваши пожертвования помогают нам улучшать сервис, развивать функциональность и обеспечивать доступ к важной информации для всех пользователей.",
  keywords: "пожертвование Info4cars, поддержать проект, E-POS, помощь проекту, финансирование, Info4cars донат, поддержка сайта",
};

function SupportUsPage() {
  const { t } = useTranslation("page");
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
