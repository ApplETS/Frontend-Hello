'use server';

import React from 'react';
import UsersTable from './components/UserTable';
import { getUsers } from '@/lib/get-users';
import { getActivityAreas } from '@/lib/get-activity-areas';

interface Props {
	params: { locale: string };
}

export default async function Approbations({ params: { locale } }: Props) {
	const users = await getUsers();
	const activityAreas = await getActivityAreas();

	return <UsersTable users={users} locale={locale} activityAreas={activityAreas} />;
}
