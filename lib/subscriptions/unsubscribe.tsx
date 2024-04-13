import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';

export async function unsubscribe(token: string) {
	const response = await fetchWithSession(`subscriptions`, Method.DELETE, {
		subscriptionToken: token,
	});

	if (!response.ok) {
		throw new Error('Failed to unsubscribe');
	}
}
