'use server';

import React from 'react';
import ApprobationsTable from './components/ApprobationsTable';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { getTags } from '@/lib/get-tags';
import { getPublications } from '@/lib/publications/get-publications';
import { getModeratorEvents } from '@/lib/get-moderator-events';

type Props = {
	params: { locale: string };
};

export default async function Approbations({ params: { locale } }: Props) {
	const publications = await getModeratorEvents();
	const user = await getAuthenticatedUser();
	const tags = await getTags();
	return <ApprobationsTable locale={locale} events={publications} user={user} tags={tags} />;
}
