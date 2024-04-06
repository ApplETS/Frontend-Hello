import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';
import { HelloEvent } from '@/models/hello-event';

export async function getOrganizerEventsPaginated(
	pageNumber: number = 1,
	pageSize: number = 100,
	title?: string,
	state?: string,
	orderBy?: string,
	orderByDesc?: boolean
): Promise<ApiPaginatedResponse<HelloEvent>> {
	let url = `organizer/events?PageNumber=${pageNumber}&PageSize=${pageSize}`;

	if (title) {
		url += `&title=${title}`;
	}

	if (state) {
		url += `&state=${state}`;
	}

	if (orderBy) {
		url += `&OrderBy=${orderBy}`;
	}

	if (orderByDesc) {
		url += `&Descending=${orderByDesc}`;
	}

	const response = await fetchWithSession(url, Method.GET);

	if (!response.ok) {
		throw new Error('Failed to fetch events');
	}

	const responseData: ApiPaginatedResponse<HelloEvent> = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData;
}
