'use server';

import React from 'react';
import { getEvents } from '@/lib/get-events';
import UsersTable from './components/UsersTable';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';

type Props = {
	params: { locale: string };
};

export default async function Approbations({ params: { locale } }: Props) {
	const user = await getAuthenticatedUser();
	return <UsersTable locale={locale} users={[user]} />;
}
