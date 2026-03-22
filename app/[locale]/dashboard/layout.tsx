import React, { ReactElement, use } from 'react';
import DashboardLayout from './components/dashboardLayout';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { UserTypes } from '@/models/user-types';
import ToastProvider from '@/utils/provider/ToastProvider';
import LoadingProvider from '@/utils/provider/LoadingProvider';
import UserProvider from '@/utils/provider/UserProvider';

type Props = {
	children: ReactElement;
	params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations('Dashboard');
	let user;
	try {
		user = await getAuthenticatedUser();
		console.log("🚀", user)
	} catch (error) {
		user = null;
	}


	const isOrganizer = user?.type == UserTypes.ORGANIZER;
	const isModerator = user?.type == UserTypes.MODERATOR;

	var pages = {
		news: {
			title: t('news'),
			link: `/${locale}/dashboard/news`,
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
		accounts: {
			title: t('accounts'),
			link: `/${locale}/dashboard/accounts`,
			isVisible: isModerator,
		},
	};

	return (
		<>
			<ToastProvider>
				<UserProvider>
					<LoadingProvider>
						<DashboardLayout pages={pages} user={user} locale={locale}>
							{children}
						</DashboardLayout>
					</LoadingProvider>
				</UserProvider>
			</ToastProvider>
		</>
	);
}
