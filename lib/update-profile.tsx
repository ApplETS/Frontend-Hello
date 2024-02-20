import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { User } from '@/models/user';

export async function updateUserProfile(userObject: User) {
	const response = await fetchWithSession(`user`, Method.PATCH, userObject);

	if (!response.ok) {
		throw new Error('Failed the authenticated user information');
	}
}