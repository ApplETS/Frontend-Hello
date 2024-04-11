import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';

export async function toggleUser(id: string, reason?: string) {
	const response = await fetchWithSession(
		`organizers/${id}/toggle${reason ? `?reason=${reason}` : ''}`,
		Method.PATCH,
		null
	);

	if (!response.ok) {
		throw new Error('Failed to create user');
	}
}
