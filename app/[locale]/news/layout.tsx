import React, { ReactElement } from 'react';
import DashboardLayout from '../dashboard/components/dashboardLayout';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { signOut } from '@/utils/supabase/auth';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { UserTypes } from '@/models/user-types';

type Props = {
	children: ReactElement;
	params: { locale: string };
};

export default async function Layout({ children, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = await getTranslations('Dashboard');
	let user;
	try {
		user = await getAuthenticatedUser();
	} catch (error) {
		user = null;
	}
	const isOrganizer = user?.type == UserTypes.ORGANIZER;
	const isModerator = user?.type == UserTypes.MODERATOR;

	var pages = {
		news: {
			title: t('news'),
			link: `/${locale}/news`,
			isVisible: true,
		},
		publications: {
			title: t('publications'),
			link: `/${locale}/dashboard/publications`,
			isVisible: isOrganizer,
		},
		approbations: {
			title: t('approbations'),
			link: `/${locale}/dashboard/approbations`,
			isVisible: isModerator,
		},
	};
	return (
		<DashboardLayout user={user} signOut={signOut} pages={pages}>
			{children}
		</DashboardLayout>
	);
}
