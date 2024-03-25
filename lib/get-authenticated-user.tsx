import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { User } from '@/models/user';

export async function getAuthenticatedUser(): Promise<User> {
	const response = await fetchWithSession(`me`, Method.GET);

	if (!response.ok) {
		throw new Error('Failed the authenticated user information');
	}

	const responseData: ApiResponse<User> = await response.json();

	// Check for errors in response
	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
