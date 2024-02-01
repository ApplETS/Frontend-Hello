import React, { ReactElement } from "react";
import DashboardLayout from "./components/dashboardLayout";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  children: ReactElement;
  params: { locale: string };
};

export default function Layout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Dashboard");

  const pages = {
    dashboard: {
      title: t("dashboard"),
      link: `/${locale}/dashboard`,
    },
    publications: {
      title: t("publications"),
      link: `/${locale}/dashboard/publications`,
    },
    approbations: {
      title: t("approbations"),
      link: `/${locale}/dashboard/approbations`,
    },
  };

  return <DashboardLayout pages={pages}>{children}</DashboardLayout>;
}
