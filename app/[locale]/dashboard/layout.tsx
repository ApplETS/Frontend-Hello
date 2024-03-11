import React, { ReactElement } from 'react';
import DashboardLayout from './components/dashboardLayout';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { signOut } from '@/utils/supabase/auth';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { UserTypes } from '@/models/user-types';
import ToastProvider from '@/utils/provider/ToastProvider';

type Props = {
	children: ReactElement;
	params: { locale: string };
};

export default async function Layout({ children, params: { locale } }: Props) {
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
		comptes: {
			title: t('accounts'),
			link: `/${locale}/dashboard/accounts`,
			isVisible: user.type == 'Moderator',
		},
	};

	return (
		<ToastProvider>
			<DashboardLayout pages={pages} signOut={signOut} user={user}>
				{children}
			</DashboardLayout>
		</ToastProvider>
	);
}
