import { GeistSans } from 'geist/font/sans';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '@mdxeditor/editor/style.css';
import { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import {routing } from '@/i18n/routing';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import NextTopLoader from 'nextjs-toploader';
import { SettingsProvider } from '@/utils/provider/SettingsProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React from 'react';


type Props = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	const locales = routing.locales;
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

	return {
		title: t('title'),
	};
}

export default function RootLayout({ children, params }: Props) {
	const { locale } = React.use(params);
	setRequestLocale(locale);
	const messages = useMessages();
	dayjs.extend(utc);
	dayjs.extend(timezone);

	return (
		<html lang={locale} className={GeistSans.className}>
		<body className="bg-base-300 text-base-content">
		<NextTopLoader showSpinner={false} />
		<main className="flex flex-col h-screen">
			<SettingsProvider>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</SettingsProvider>
		</main>
		</body>
		</html>
	);
}
