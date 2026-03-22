import { setRequestLocale } from 'next-intl/server';
import SocialsClient from './pageClient';

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function Socials(props: Props) {
    const params = await props.params;
   setRequestLocale(params.locale);

    return <SocialsClient />;
}
