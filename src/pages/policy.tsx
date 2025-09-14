import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import Link from "next/link";
import { getI18nProps } from "@/lib/withTranslations";
import { useTranslation } from "react-i18next";

const HeaderProps = {
  title: "Политика конфиденциальности и пользовательское соглашение | Info4cars",
  description:
    "Ознакомьтесь с политикой конфиденциальности и пользовательским соглашением Info4cars. Мы соблюдаем Закон о защите персональных данных и обеспечиваем безопасность введённой вами информации.",
  keywords: "политика конфиденциальности, защита данных, пользовательское соглашение, Info4cars, персональные данные, безопасность, Беларусь",
};

function PolicyPage() {
  const { t } = useTranslation("page");
  return (
    <MainLayout {...HeaderProps}>
      <main className={`${styles.main} `}>
        <h3>{t("privacyPolicy.title")}</h3>

        {/* <h1>{t("privacyPolicy.agreementTitle")}</h1> */}
        <div className="agreement">
          <p>{t("privacyPolicy.agreement.service")}</p>
          <p>{t("privacyPolicy.agreement.dataTransfer")}</p>
          <p>{t("privacyPolicy.agreement.statistics")}</p>
          <p>{t("privacyPolicy.agreement.responsibility")}</p>
          <p>{t("privacyPolicy.agreement.intellectual")}</p>
          <p>{t("privacyPolicy.agreement.consent")}</p>
        </div>
      </main>
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default PolicyPage;
