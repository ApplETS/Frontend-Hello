'use server';

import { getModeratorEventsPaginated } from '@/lib/publications/get-moderator-events-paginated';

export async function getNextEventsModerator(
	page: number,
	nbPerPage: number,
	title?: string,
	state?: string,
	orderBy?: string,
	orderByDesc?: boolean
) {
	let eventsPaginated;
	try {
		eventsPaginated = await getModeratorEventsPaginated(page, nbPerPage, title, state, orderBy, orderByDesc);
	} catch (error) {
		return null;
	}

	return eventsPaginated;
}
