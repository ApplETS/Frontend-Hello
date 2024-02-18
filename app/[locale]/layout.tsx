import { GeistSans } from "geist/font/sans";
import "./globals.css";
import {ReactNode} from 'react';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {locales} from '../../config';
import { NextIntlClientProvider, useMessages } from "next-intl";

type Props = {
  children: ReactNode;
  params: {locale: string};
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params: {locale}
}: Omit<Props, 'children'>) {
  const t = await getTranslations({locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}

export default function RootLayout({
  children,
  params: {locale}
}: Props)  {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale} className={GeistSans.className}>
      <body className="bg-base-300 text-base-content">
        <main className="min-h-screen flex flex-col items-center">
          <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
