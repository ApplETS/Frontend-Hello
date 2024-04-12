import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { Tag } from '@/models/tag';

export async function getTags(): Promise<Tag[]> {
	const response = await fetchWithSession(`tags`, Method.GET);

	if (!response.ok) {
		throw new Error('Failed to fetch tags');
	}

	const responseData: ApiResponse<Tag[]> = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
