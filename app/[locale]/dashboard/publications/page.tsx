import React from 'react';
import PublicationsTable from './components/PublicationsTable';
import { getTags } from '@/lib/get-tags';
import { getActivityAreas } from '@/lib/get-activity-areas';

type Props = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ id: string }>;
};

export default async function Publications(props: Props) {
    const searchParams = await props.searchParams;

    const {
        id
    } = searchParams;

    const params = await props.params;

    const {
        locale
    } = params;

    const tags = await getTags();
    const activityAreas = await getActivityAreas();
    return <PublicationsTable locale={locale} tags={tags} id={id} activityAreas={activityAreas} />;
}
