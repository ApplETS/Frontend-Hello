import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';

export async function updatePublication(eventId: string, newState: number) {
	const response = await fetchWithSession(`moderator/events/${eventId}/state?newState=${newState}`, Method.PATCH);

	if (!response.ok) {
		throw new Error('Failed to update publication state');
	}
}
