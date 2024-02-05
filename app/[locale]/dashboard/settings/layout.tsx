import React, { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { signOut } from '@/utils/supabase/auth';
import SettingsLayout from './components/settingsLayout';
import { faGear, faKey, faLink, faUser } from '@fortawesome/free-solid-svg-icons';

type Props = {
	children: ReactElement;
	params: { locale: string };
};

export default function Layout({ children, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);

	const t = useTranslations('Settings');

	const pages = {
		profile: {
			title: t('profile'),
			link: `/${locale}/dashboard/settings/profile`,
			icon: faUser,
		},
		password: {
			title: t('password'),
			link: `/${locale}/dashboard/settings/password`,
			icon: faLink,
		},
		display: {
			title: t('appearance'),
			link: `/${locale}/dashboard/settings/display`,
			icon: faKey,
		},
		socials: {
			title: t('socials'),
			link: `/${locale}/dashboard/settings/socials`,
			icon: faGear,
		},
	};

	return (
		<SettingsLayout locale={locale} pages={pages}>
			{children}
		</SettingsLayout>
	);
}
