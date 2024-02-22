'use server';

import React from 'react';
import { getModeratorEvents } from '@/lib/get-moderator-events';
import ApprobationsTable from './components/ApprobationsTable';

type Props = {
	params: { locale: string };
};

export default async function Approbations({ params: { locale } }: Props) {
	const events = await getModeratorEvents();
	return <ApprobationsTable locale={locale} events={events} />;
}
