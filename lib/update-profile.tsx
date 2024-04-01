import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { User } from '@/models/user';

export async function updateUserProfile(userObject: User) {
	console.log(userObject);
	const response = await fetchWithSession(`me`, Method.PATCH, userObject);

	if (!response.ok) {
		throw new Error('Failed the authenticated user information');
	}
}
