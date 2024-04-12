import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { NewsStates } from '@/models/news-states';

export async function patchModeratorPublication(id: string, newState: NewsStates, reason: string | null) {
	const response = await fetchWithSession(
		`moderator-events/${id}/state?newState=${newState}${reason ? `&reason=${reason}` : ''}`,
		Method.PATCH
	);

	if (!response.ok) {
		throw new Error('Failed to update publication state');
	}
}
