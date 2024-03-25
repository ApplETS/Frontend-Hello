import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { HelloEvent } from '@/models/hello-event';

export async function draftPublication(formData: FormData) {
	const response = await fetchWithSession('organizer/events', Method.POSTFORM, formData);

	if (!response.ok) {
		throw new Error('Failed to draft the publication');
	}

	const responseData: ApiResponse<HelloEvent> = await response.json();
	console.log('responseData', responseData.data);

	return responseData.data;
}
