import { setRequestLocale } from 'next-intl/server';
import PasswordClient from './pageClient';

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function Password({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <PasswordClient />;
}
