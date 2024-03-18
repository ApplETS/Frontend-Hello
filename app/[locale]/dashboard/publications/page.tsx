import React from 'react';
import { getPublications } from '@/lib/publications/get-publications';
import PublicationsTable from './components/PublicationsTable';
import { getTags } from '@/lib/get-tags';

type Props = {
	params: { locale: string };
};

export default async function Publications({ params: { locale } }: Props) {
	const publications = await getPublications();
	const tags = await getTags();
	// TODO : Enlever que ce sera fait sur le backend
	tags.sort((a, b) => a.name.localeCompare(b.name));

	return <PublicationsTable locale={locale} publications={publications} tags={tags} />;
}
