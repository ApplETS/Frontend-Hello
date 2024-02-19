import React from 'react';
import { getEvents as getPublications } from '@/lib/get-publications';
import PublicationsTable from './components/PublicationsTable';

type Props = {
	params: { locale: string };
};

export default async function Publications({ params: { locale } }: Props) {
	const publications = await getPublications();

	return <PublicationsTable locale={locale} publications={publications} />;
}
