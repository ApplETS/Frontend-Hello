import React from 'react';
import { getPublications } from '@/lib/publications/get-publications';
import PublicationsTable from './components/PublicationsTable';
import { getTags } from '@/lib/get-tags';

type Props = {
	params: { locale: string };
	searchParams: { id: string };
};

export default async function Publications({ params: { locale }, searchParams: { id } }: Props) {
	const publications = await getPublications();
	const tags = await getTags();
	return <PublicationsTable locale={locale} publications={publications} tags={tags} id={id} />;
}
