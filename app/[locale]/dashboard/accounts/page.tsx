'use server';

import React from 'react';
import UsersTable from './components/UserTable';
import { getUsers } from '@/lib/get-users';

export default async function Approbations() {
	const users = await getUsers();
	return <UsersTable users={users} />;
}
