import React from 'react';
import { getPublications } from '@/lib/publications/get-publications';
import PublicationsTable from './components/PublicationsTable';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { getTags } from '@/lib/get-tags';

type Props = {
	params: { locale: string };
};

export default async function Publications({ params: { locale } }: Props) {
	const publications = await getPublications();
	const tags = await getTags();
	const user = await getAuthenticatedUser();

	return <PublicationsTable locale={locale} publications={publications} tags={tags} user={user} />;
}
