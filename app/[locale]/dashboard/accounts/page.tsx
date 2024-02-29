'use server';

import React from 'react';
import UsersTable from './components/userTable';
import { getUsers } from '@/lib/get-users';

type Props = {
	params: { locale: string };
	searchParams: Record<string, string> | null | undefined;
};

export default async function Approbations({ params: { locale }, searchParams }: Props) {
	const users = await getUsers();
	return <UsersTable users={users} />;
}
