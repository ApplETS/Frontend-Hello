import { Method, fetchWithSession } from '../fetch-with-refresh';

export async function deletePublication(id: string) {
	const response = await fetchWithSession(`organizer-events/${id}`, Method.DELETE);

	if (!response.ok) {
		throw new Error('Failed to fetch events');
	}
}
