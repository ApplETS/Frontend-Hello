'use server';

import React from 'react';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import UserCreateDialog from './components/createDialog';
import UsersTable from './components/userTable';

type Props = {
	params: { locale: string };
	searchParams: Record<string, string> | null | undefined;
};

export default async function Approbations({ params: { locale }, searchParams }: Props) {
	const user = await getAuthenticatedUser();
	const create = searchParams?.create;

	console.log(searchParams);
	return (
		<>
			<UsersTable locale={locale} users={[user]} />
			{create && <UserCreateDialog />}
		</>
	);
}
