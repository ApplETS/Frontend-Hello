import { unstable_setRequestLocale } from 'next-intl/server';
import SocialsClient from './pageClient';

type Props = {
	params: { locale: string };
};

export default async function Socials({ params }: Props) {
	unstable_setRequestLocale(params.locale);

	return <SocialsClient />;
}
