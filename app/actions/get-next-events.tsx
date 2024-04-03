'use server';

import { getEventsPaginated } from '@/lib/get-events-paginated';

export async function getNextEvents(page: number, nbPerPage: number, organizerId?: string) {
	let eventsPaginated;

	try {
		eventsPaginated = await getEventsPaginated(page, nbPerPage, organizerId);
	} catch (error) {
		return null;
	}

	return eventsPaginated;
}
