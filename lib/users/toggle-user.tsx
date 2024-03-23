import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';

export async function toggleUser(id: string) {
	const response = await fetchWithSession(`moderator/organizer/${id}/toggle`, Method.PATCH, null);

	if (!response.ok) {
		throw new Error('Failed to create user');
	}
}
