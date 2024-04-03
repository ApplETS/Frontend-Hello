import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';

export async function getModeratorEventsPaginated(
	pageNumber: number = 1,
	pageSize: number = 100,
	title?: string,
	state?: string
): Promise<ApiPaginatedResponse> {
	let url = `moderator/events?PageNumber=${pageNumber}&PageSize=${pageSize}`;

	if (title) {
		url += `&title=${title}`;
	}

	if (state) {
		url += `&state=${state}`;
	}

	const response = await fetchWithSession(url, Method.GET);

	if (!response.ok) {
		throw new Error('Failed to fetch events');
	}

	const responseData: ApiPaginatedResponse = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData;
}
