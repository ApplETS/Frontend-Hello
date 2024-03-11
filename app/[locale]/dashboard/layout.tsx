import React, { ReactElement } from 'react';
import DashboardLayout from './components/dashboardLayout';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { signOut } from '@/utils/supabase/auth';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { UserTypes } from '@/models/user-types';

type Props = {
	children: ReactElement;
	params: { locale: string; userId: string };
};

export default async function Layout({ children, params: { locale, userId } }: Props) {
	unstable_setRequestLocale(locale);

	const t = await getTranslations('Dashboard');
	const user = await getAuthenticatedUser();
	const isOrganizer = user.type == UserTypes.ORGANIZER;
	const isModerator = user.type == UserTypes.MODERATOR;

	var pages = {
		news: {
			title: t('news'),
			link: `/${locale}/news`,
			isVisible: true,
		},
		profile: {
			title: t('profile'),
			link: `/${locale}/dashboard/profile/${userId}`,
			isVisible: false,
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
		<DashboardLayout pages={pages} signOut={signOut} user={user}>
			{children}
		</DashboardLayout>
	);
}
