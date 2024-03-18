import { unstable_setRequestLocale } from 'next-intl/server';
import ProfileClient from './pageClient';

type Props = {
	params: { locale: string };
};

export default async function Profile({ params }: Props) {
	unstable_setRequestLocale(params.locale);

	return <ProfileClient />;
}
