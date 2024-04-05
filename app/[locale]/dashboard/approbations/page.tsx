'use server';

import React from 'react';
import ApprobationsTable from './components/ApprobationsTable';
import { getTags } from '@/lib/get-tags';
import { getActivityAreas } from '@/lib/get-activity-areas';

type Props = {
	params: { locale: string };
	searchParams: { id: string };
};

export default async function Approbations({ params: { locale }, searchParams: { id } }: Props) {
	const tags = await getTags();
	const activityAreas = await getActivityAreas();

	return <ApprobationsTable locale={locale} tags={tags} id={id} activityAreas={activityAreas} />;
}
