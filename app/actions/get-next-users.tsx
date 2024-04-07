'use server';

import { getUsers } from '@/lib/get-users';

export async function getNextUsers(page: number, nbPerPage: number, search?: string, state?: number) {
	let eventsPaginated;
	try {
		eventsPaginated = await getUsers(page, nbPerPage, search, state);
	} catch (error) {
		return null;
	}

	return eventsPaginated;
}
