import { unstable_setRequestLocale } from 'next-intl/server';
import PasswordClient from './pageClient';

type Props = {
	params: { locale: string };
};

export default async function Password({ params }: Props) {
	unstable_setRequestLocale(params.locale);

	return <PasswordClient />;
}
