import React from 'react';
import { getEvents as getPublications } from '@/lib/get-publications';
import PublicationsTable from './components/PublicationsTable';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';

type Props = {
	params: { locale: string };
};

export default async function Publications({ params: { locale } }: Props) {
	const publications = await getPublications();
	const user = await getAuthenticatedUser();

	return <PublicationsTable locale={locale} publications={publications} user={user} />;
}
