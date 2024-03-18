import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { User } from '@/models/user';
import Constants from '@/utils/constants';

export async function getUsers(): Promise<User[]> {
	const response = await fetchWithSession(`moderator/organizer`, Method.GET, null, Constants.tags.users);

	if (!response.ok) {
		throw new Error('Failed to fetch users');
	}

	const responseData: ApiResponse<User[]> = await response.json();

	// Check for errors in response
	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
