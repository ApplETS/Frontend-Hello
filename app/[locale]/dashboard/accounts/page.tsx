'use server';

import React from 'react';
import UsersTable from './components/UserTable';

interface Props {
	params: { locale: string };
}

export default async function Approbations({ params: { locale } }: Props) {
	return <UsersTable locale={locale} />;
}
