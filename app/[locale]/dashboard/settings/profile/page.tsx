import { unstable_setRequestLocale } from 'next-intl/server';
import ProfileClient from './pageClient';
import { getActivityAreas } from '@/lib/get-activity-areas';

type Props = {
	params: { locale: string };
};

export default async function Profile({ params }: Props) {
	unstable_setRequestLocale(params.locale);
	const activityAreas = await getActivityAreas();
	return <ProfileClient activityAreas={activityAreas} locale={params.locale} />;
}
