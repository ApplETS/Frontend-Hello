'use server';

import React from 'react';
import { getEvents } from '@/lib/get-events';
import ApprobationsTable from './components/ApprobationsTable';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';

type Props = {
	params: { locale: string };
};

export default async function Approbations({ params: { locale } }: Props) {
	const events = await getEvents();
	const user = await getAuthenticatedUser();
	return <ApprobationsTable locale={locale} events={events} user={user} />;
}
