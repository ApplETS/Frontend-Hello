'use server';

import React from 'react';
import UsersTable from './components/UserTable';
import { getUsers } from '@/lib/get-users';
import { getActivityAreas } from '@/lib/get-activity-areas';

interface Props {
	params: Promise<{ locale: string }>;
}

export default async function Approbations({ params }: Props) {
	const {locale} = await params;
	const activityAreas = await getActivityAreas();

	return <UsersTable locale={locale} activityAreas={activityAreas} />;
}
