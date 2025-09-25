import { TFunction } from "i18next";

export const getHeaderProps = (t: TFunction, pageKey: string) => ({
  title: t(`${pageKey}.meta.title`),
  description: t(`${pageKey}.meta.description`),
  keywords: t(`${pageKey}.meta.keywords`),
});
