import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ActivityArea } from '@/models/activity-area';
import { ApiResponse } from '@/models/api-response';

export async function getActivityAreas(): Promise<ActivityArea[]> {
	const response = await fetchWithSession(`activity-areas`, Method.GET);

	if (!response.ok) {
		throw new Error('Failed to fetch activity areas');
	}

	const responseData: ApiResponse<ActivityArea[]> = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
