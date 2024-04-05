'use server';

import { getEventsPaginated } from '@/lib/get-events-paginated';

export async function getNextEvents(
	page: number,
	nbPerPage: number,
	organizerId?: string,
	title?: string,
	activityAreas?: string[]
) {
	let eventsPaginated;

	try {
		eventsPaginated = await getEventsPaginated(page, nbPerPage, organizerId, title, activityAreas);
	} catch (error) {
		return null;
	}

	return eventsPaginated;
}
