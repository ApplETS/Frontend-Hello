import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { HelloEvent } from '@/models/hello-event';

export async function addPublication(
	title: string,
	content: string,
	// altText: string,
	imageUrl: string,
	state: number,
	publicationDate: string,
	eventStartDate: string,
	// eventEndDate: string,
	tags: string[]
) {
	const response = await fetchWithSession('organizer/events', Method.POST, {
		title,
		content,
		// altText,
		imageUrl,
		state,
		publicationDate,
		eventStartDate,
		// eventEndDate,
		tags,
	});

	if (!response.ok) {
		throw new Error('Failed to create publication');
	}

	const responseData: ApiResponse<HelloEvent> = await response.json();

	return responseData.data;
}
