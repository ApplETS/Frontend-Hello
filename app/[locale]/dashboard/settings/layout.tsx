import React, { ReactElement } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { UserTypes } from '@/models/user-types';
import { faGear, faKey, faLink, faUser } from '@fortawesome/free-solid-svg-icons';
import SettingsLayout from './components/settingsLayout';

type Props = {
	children: ReactElement;
	params: { locale: string };
};

export default async function Layout({ children, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);

	const t = await getTranslations('Settings');
	const user = await getAuthenticatedUser();
	const isOrganizer = user.type == UserTypes.ORGANIZER;

	const pages = {
		profile: {
			title: t('profile'),
			link: `/${locale}/dashboard/settings/profile`,
			icon: faUser,
		},
		...(isOrganizer && {
			socials: {
				title: t('socials'),
				link: `/${locale}/dashboard/settings/socials`,
				icon: faLink,
			},
		}),
		password: {
			title: t('password'),
			link: `/${locale}/dashboard/settings/password`,
			icon: faKey,
		},
		display: {
			title: t('appearance'),
			link: `/${locale}/dashboard/settings/display`,
			icon: faGear,
		},
	};

	return (
		<SettingsLayout locale={locale} pages={pages} sectionTitle={t('title')}>
			{children}
		</SettingsLayout>
	);
}
