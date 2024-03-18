import React, { ReactElement } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import SettingsLayout from './components/settingsLayout';

type Props = {
	children: ReactElement;
	params: { locale: string };
};

export default async function Layout({ children, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);

	const t = await getTranslations('Settings');

	return (
		<SettingsLayout locale={locale} sectionTitle={t('title')}>
			{children}
		</SettingsLayout>
	);
}
