import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';
import { User } from '@/models/user';
import Constants from '@/utils/constants';

export async function getUsers(
	page?: number,
	pageSize?: number,
	search?: string,
	state?: number
): Promise<ApiPaginatedResponse<User>> {
	let url = `organizers?PageNumber=${page ? page : 1}&PageSize=${pageSize ? pageSize : 1000}`;

	if (search) {
		url += `&search=${search}`;
	}

	if (state) {
		url += `&filter=${state}`;
	}

	const response = await fetchWithSession(url, Method.GET, null, Constants.tags.users);

	if (!response.ok) {
		throw new Error('Failed to fetch users');
	}

	const responseData: ApiPaginatedResponse<User> = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData;
}
