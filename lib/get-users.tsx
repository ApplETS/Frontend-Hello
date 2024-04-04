import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { User } from '@/models/user';
import Constants from '@/utils/constants';

export async function getUsers(): Promise<User[]> {
	const response = await fetchWithSession(
		`moderator/organizer?PageNumber=${1}&PageSize=${1000}`,
		Method.GET,
		null,
		Constants.tags.users
	);

	if (!response.ok) {
		throw new Error('Failed to fetch users');
	}

	const responseData: ApiResponse<User[]> = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
