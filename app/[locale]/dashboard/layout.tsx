import React, { ReactElement } from 'react';
import DashboardLayout from './components/dashboardLayout';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { signOut } from '@/utils/supabase/auth';
import { getUser } from '@/lib/getUser';

type Props = {
	children: ReactElement;
	params: { locale: string };
};

export default async function Layout({ children, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);

	const t = await getTranslations('Dashboard');
	const user = await getUser();

	const pages = {
		news: {
			title: t('news'),
			link: `/${locale}/news`,
		},
		publications: {
			title: t('publications'),
			link: `/${locale}/dashboard/publications`,
		},
		approbations: {
			title: t('approbations'),
			link: `/${locale}/dashboard/approbations`,
		},
	};

	return (
		<DashboardLayout pages={pages} signOut={signOut} user={user}>
			{children}
		</DashboardLayout>
	);
}
