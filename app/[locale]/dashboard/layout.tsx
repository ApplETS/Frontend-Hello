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
    projects: {
      title: t("projects"),
      link: `/${locale}/dashboard/projects`,
    },
    submissions: {
      title: t("submissions"),
      link: `/${locale}/dashboard/submissions`,
    },
  };

  return <DashboardLayout pages={pages}>{children}</DashboardLayout>;
}
