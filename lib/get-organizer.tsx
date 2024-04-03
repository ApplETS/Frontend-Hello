import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { Organizer } from '@/models/organizer';

export async function getOrganizer(organizerId: string): Promise<Organizer> {
	const response = await fetchWithSession(`moderator/organizer/${organizerId}`, Method.GET);

	if (!response.ok) {
		throw new Error('Failed to fetch organizer');
	}

	const responseData: ApiResponse<Organizer> = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
