'use server';

import { getModeratorEventsPaginated } from '@/lib/publications/get-moderator-events-paginated';

export async function getNextEventsModerator(page: number, nbPerPage: number, title?: string, state?: string) {
	let eventsPaginated;
	try {
		eventsPaginated = await getModeratorEventsPaginated(page, nbPerPage, title, state);
	} catch (error) {
		return null;
	}

	return eventsPaginated;
}
