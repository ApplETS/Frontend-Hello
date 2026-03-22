import { setRequestLocale } from 'next-intl/server';
import ProfileClient from './pageClient';
import { getActivityAreas } from '@/lib/get-activity-areas';

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function Profile(props: Props) {
    const params = await props.params;
    setRequestLocale(params.locale);
    const activityAreas = await getActivityAreas();
    return <ProfileClient activityAreas={activityAreas} locale={params.locale} />;
}
