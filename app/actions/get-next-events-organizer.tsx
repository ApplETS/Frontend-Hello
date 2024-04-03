'use server';

import { getOrganizerEventsPaginated } from '@/lib/publications/get-organizer-events-paginated';

export async function getNextEventsOrganizer(page: number, nbPerPage: number, title?: string, state?: string) {
	let eventsPaginated;
	try {
		eventsPaginated = await getOrganizerEventsPaginated(page, nbPerPage, title, state);
	} catch (error) {
		return null;
	}

	return eventsPaginated;
}
