'use server';

import React from 'react';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import UsersTable from './components/userTable';

type Props = {
	params: { locale: string };
	searchParams: Record<string, string> | null | undefined;
};

export default async function Approbations({ params: { locale }, searchParams }: Props) {
	const user = await getAuthenticatedUser();

	console.log(searchParams);
	return <UsersTable users={[user]} />;
}
