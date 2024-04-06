'use server';

import { getModeratorEventsPaginated } from '@/lib/publications/get-moderator-events-paginated';
import { ActivityArea } from '@/models/activity-area';

export async function getNextEventsModerator(
	page: number,
	nbPerPage: number,
	title?: string,
	state?: string,
	activityAreas?: string[],
	orderBy?: string,
	orderByDesc?: boolean
) {
	let eventsPaginated;
	try {
		eventsPaginated = await getModeratorEventsPaginated(
			page,
			nbPerPage,
			title,
			state,
			activityAreas,
			orderBy,
			orderByDesc
		);
	} catch (error) {
		return null;
	}

	return eventsPaginated;
}
