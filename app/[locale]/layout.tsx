import { GeistSans } from 'geist/font/sans';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '@mdxeditor/editor/style.css';
import { ReactNode } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { locales } from '../../config';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import NextTopLoader from 'nextjs-toploader';
import { SettingsProvider } from '@/utils/provider/SettingsProvider';

type Props = {
	children: ReactNode;
	params: { locale: string };
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
	const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

	return {
		title: t('title'),
	};
}

export default function RootLayout({ children, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const messages = useMessages();

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
