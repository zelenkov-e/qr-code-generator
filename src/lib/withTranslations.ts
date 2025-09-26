// lib/withTranslations.ts

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export function getI18nProps(namespaces: string[] = ["common"]) {
  return async function getStaticProps({ locale }: { locale?: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", namespaces)),
      },
    };
  };
}
