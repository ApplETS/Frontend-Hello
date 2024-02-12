import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { User } from '@/models/user';

export async function getUser() {
	const response = await fetchWithSession('user', Method.GET);

	if (!response.ok) {
		throw new Error('Failed to fetch projects');
	}

	const responseData = await response.json();

	// Assuming the 'data' field in the response contains the list of projects
	const user: User = responseData.data;

	return user;
}
