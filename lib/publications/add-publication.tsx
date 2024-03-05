import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { HelloEvent } from '@/models/hello-event';

export async function addPublication(formData: FormData) {
	const response = await fetchWithSession('organizer/events', Method.POSTFORM, formData);

	if (!response.ok) {
		throw new Error('Failed to create publication');
	}

	const responseData: ApiResponse<HelloEvent> = await response.json();

	return responseData.data;
}
