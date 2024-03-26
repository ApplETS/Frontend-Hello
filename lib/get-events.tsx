import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';
import { HelloEvent } from '@/models/hello-event';
import { NewsStates } from '@/models/news-states';

export async function getEvents(pageNumber: number = 1): Promise<HelloEvent[]> {
	const response = await fetchWithSession(`events?PageNumber=${pageNumber}&PageSize=100`, Method.GET);

	if (!response.ok) {
		throw new Error('Failed to fetch events');
	}

	const responseData: ApiPaginatedResponse = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
