import React from 'react';
import PublicationsTable from './components/PublicationsTable';
import { getTags } from '@/lib/get-tags';
import { getActivityAreas } from '@/lib/get-activity-areas';

type Props = {
	params: { locale: string };
	searchParams: { id: string };
};

export default async function Publications({ params: { locale }, searchParams: { id } }: Props) {
	const tags = await getTags();
	const activityAreas = await getActivityAreas();
	return <PublicationsTable locale={locale} tags={tags} id={id} activityAreas={activityAreas} />;
}
