'use server';

import { getUsers } from '@/lib/get-users';

export async function getNextUsers(page: number, nbPerPage: number, search?: string) {
	let eventsPaginated;
	try {
		eventsPaginated = await getUsers(page, nbPerPage, search);
	} catch (error) {
		return null;
	}

	return eventsPaginated;
}
