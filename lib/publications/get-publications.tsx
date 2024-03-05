import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';
import { HelloEvent } from '@/models/hello-event';
import { NewsStates } from '@/models/news-states';
import Constants from '@/utils/constants';

export async function getPublications(
	state: NewsStates = NewsStates.ALL,
	pageNumber: number = 1
): Promise<HelloEvent[]> {
	const response = await fetchWithSession(
		`organizer/events?PageNumber=${pageNumber}&PageSize=100&state=${state}`,
		Method.GET,
		undefined,
		Constants.tags.publications
	);

	if (!response.ok) {
		throw new Error('Failed to fetch events');
	}

	const responseData: ApiPaginatedResponse = await response.json();

	// Check for errors in response
	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
