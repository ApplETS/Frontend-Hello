import { GeistSans } from "geist/font/sans";
import "./globals.css";
import '@mdxeditor/editor/style.css'
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
     <body className="bg-base-100 text-base-content">
        <main className="flex flex-col h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
