import React, { ReactElement } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SettingsLayout from './components/settingsLayout';

type Props = {
	children: ReactElement;
	params: Promise<{ locale: string }>;
};

export default async function Layout(props: Props) {
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

   setRequestLocale(locale);

    const t = await getTranslations('Settings');

    return (
		<SettingsLayout locale={locale} sectionTitle={t('title')}>
			{children}
		</SettingsLayout>
	);
}
