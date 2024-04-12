import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';

export async function subscribe(email: String) {
	const response = await fetchWithSession(`subscriptions`, Method.POST, {
		email: email,
	});

	if (!response.ok) {
		throw new Error('Failed to subscribe');
	}
}
