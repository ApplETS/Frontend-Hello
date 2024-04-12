import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';

export async function subscribe(email: string, organizerId: string) {
	const response = await fetchWithSession(`subscriptions`, Method.POST, {
		email: email,
		organizerId: organizerId,
	});

	if (!response.ok) {
		throw new Error('Failed to subscribe');
	}
}
