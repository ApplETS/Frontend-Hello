import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';

export async function getEventsPaginated(
	pageNumber: number = 1,
	pageSize: number = 100,
	organizerId?: string,
	title?: string
): Promise<ApiPaginatedResponse> {
	let url = `events?PageNumber=${pageNumber}&PageSize=${pageSize}`;

	if (organizerId) {
		url += `&organizerId=${organizerId}`;
	}

	if (title) {
		url += `&title=${title}`;
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
