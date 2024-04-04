import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';
import { HelloEvent } from '@/models/hello-event';

/*export async function getEvents(
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

	const responseData: ApiPaginatedResponse = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}*/

export async function getEvents(
	pageNumber: number = 1,
	pageSize: number = 1000,
	organizerId?: string
): Promise<HelloEvent[]> {
	// Create a mock date for the current month
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
	const mockDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-15`;
	const mockDate2 = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-14`;

	// Create mock events
	let mockEvents: HelloEvent[] = ['1', '2', '3', '4', '5'].map((value, index) => {
		return {
			id: value,
			title: 'Event ' + value,
			content: 'Description for Event ' + value,
			imageUrl: 'https://example.com/image1.jpg',
			imageAltText: 'Event 1 Image',
			state: 'published',
			publicationDate: mockDate,
			eventStartDate: mockDate,
			eventEndDate: mockDate,
			createdAt: mockDate,
			updatedAt: mockDate,
			moderator: null,
			organizer: null,
			tags: [],
			cardId: index,
		};
	});
	/*
	let test = ['1', '2', '3', '4', '5'].map((value, index) => {
		return {
			id: value,
			title: 'Event ' + value,
			content: 'Description for Event ' + value,
			imageUrl: 'https://example.com/image1.jpg',
			imageAltText: 'Event 1 Image',
			state: 'published',
			publicationDate: mockDate,
			eventStartDate: mockDate,
			eventEndDate: mockDate,
			createdAt: mockDate,
			updatedAt: mockDate,
			moderator: null,
			organizer: null,
			tags: [],
			cardId: index,
		};
	});

	mockEvents.push(...test);
*/
	return mockEvents;
}
