import React, { ReactElement } from "react";
import DashboardLayout from "./components/dashboardLayout";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getAuthenticatedUser } from "@/lib/get-authenticated-user";

type Props = {
	children: ReactElement;
	params: { locale: string };
};

// This component should always stay server-side or else there will be security issues with the user type checking
export default async function Layout({ children, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);

	const t = await getTranslations("Dashboard");
	const user = await getAuthenticatedUser();

	var pages = {
		news: {
			title: t("news"),
			link: `/${locale}/news`,
			isVisible: true,
		},
		publications: {
			title: t("publications"),
			link: `/${locale}/dashboard/publications`,
			isVisible: true,
		},
		approbations: {
			title: t("approbations"),
			link: `/${locale}/dashboard/approbations`,
			isVisible: user.type == "Moderator",
		},
	};

	return <DashboardLayout pages={pages}>{children}</DashboardLayout>;
}
