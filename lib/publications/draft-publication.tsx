import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { HelloEvent } from '@/models/hello-event';

export async function draftPublication(formData: FormData) {
	for (const [key, value] of Array.from(formData.entries())) {
		if (!value || value === 'Invalid Date') {
			formData.delete(key);
		}
	}

	const response = await fetchWithSession('organizer-drafts', Method.POSTFORM, formData);

	if (!response.ok) {
		throw new Error('Failed to draft the publication');
	}

	const responseData: ApiResponse<HelloEvent> = await response.json();

	return responseData.data;
}
