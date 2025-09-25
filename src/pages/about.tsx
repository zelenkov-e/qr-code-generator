import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import { getI18nProps } from "@/lib/withTranslations";
import { useTranslation } from "react-i18next";
import { getHeaderProps } from "@/lib/getHeaderProps";

function AboutPage() {
  const { t } = useTranslation("page");
  const HeaderProps = getHeaderProps(t, "about");

  return (
    <MainLayout {...HeaderProps}>
      <main className={`${styles.main} `}>
        <h1>{t("about.featuresTitle")}</h1>
        <p>{t("about.intro")}</p>
        <p>{t("about.registeredUsers")}</p>

        <ul>
          <li>
            <strong>{t("about.features.bulkGeneration")}</strong>
          </li>
          <li>
            <strong>{t("about.features.customLabel")}</strong>
          </li>
          <li>
            <strong>{t("about.features.infoSearch")}</strong>
          </li>
          <li>
            <strong>{t("about.features.history")}</strong>
          </li>
        </ul>
      </main>
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default AboutPage;
