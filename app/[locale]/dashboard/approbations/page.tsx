'use server';

import React from 'react';
import ApprobationsTable from './components/ApprobationsTable';
import { getTags } from '@/lib/get-tags';
import { getModeratorEvents } from '@/lib/get-moderator-events';

type Props = {
	params: { locale: string };
};

export default async function Approbations({ params: { locale } }: Props) {
	const publications = await getModeratorEvents();
	const tags = await getTags();
	return <ApprobationsTable locale={locale} events={publications} tags={tags} />;
}
