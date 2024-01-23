import { GeistSans } from "geist/font/sans";
import "./globals.css";
import {ReactNode} from 'react';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {locales} from '../../config';

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

  return (
    <html lang={locale} className={GeistSans.className}>
      <body className="bg-background text-base-content">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
