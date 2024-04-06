import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';
import { HelloEvent } from '@/models/hello-event';

export async function getEvents(
	pageNumber: number = 1,
	pageSize: number = 1000,
	organizerId?: string
): Promise<HelloEvent[]> {
	let url = `events?PageNumber=${pageNumber}&PageSize=${pageSize}`;

	if (organizerId) {
		url += `&organizerId=${organizerId}`;
	}

	const response = await fetchWithSession(url, Method.GET);

	if (!response.ok) {
		throw new Error('Failed to fetch events');
	}

	const responseData: ApiPaginatedResponse<HelloEvent> = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
