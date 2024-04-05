import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ActivityArea } from '@/models/activity-area';
import { ApiResponse } from '@/models/api-response';

/*export async function getActivityAreas(): Promise<ActivityArea[]> {
	const response = await fetchWithSession(`activity-areas`, Method.GET);

	if (!response.ok) {
		throw new Error('Failed to fetch activity areas');
	}

	const responseData: ApiResponse<ActivityArea[]> = await response.json();

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}*/

export async function getActivityAreas(): Promise<ActivityArea[]> {
	const mockResponse = {
		data: [
			{
				id: '05ad916f-d2d0-46c1-97ac-b98ddd1bb923',
				nameFr: 'Association étudiante',
				nameEn: 'Student Association',
				createdAt: '2024-04-05T14:46:04.698432Z',
				updatedAt: '2024-04-05T14:46:04.698433Z',
			},
			{
				id: '4bd96b63-f844-43e0-b486-30027e83c814',
				nameFr: 'Centre sportif',
				nameEn: 'Sport Center',
				createdAt: '2024-04-05T14:46:04.698434Z',
				updatedAt: '2024-04-05T14:46:04.698434Z',
			},
			{
				id: 'c1082ee9-b7bf-48c0-8a36-cb9c9b9365b1',
				nameFr: 'Club scientifiques',
				nameEn: 'Scientific Club',
				createdAt: '2024-04-05T14:46:04.698435Z',
				updatedAt: '2024-04-05T14:46:04.698435Z',
			},
			{
				id: 'a39c7c35-aff1-4345-ad92-c2eb99cb0650',
				nameFr: 'École de technologie supérieure',
				nameEn: 'École de technologie supérieure',
				createdAt: '2024-04-05T14:46:04.698435Z',
				updatedAt: '2024-04-05T14:46:04.698435Z',
			},
			{
				id: '62588aee-f9dd-4f29-bd4a-c2cbcef846b9',
				nameFr: 'Service à la vie étudiante',
				nameEn: 'Student Life Service',
				createdAt: '2024-04-05T14:46:04.698435Z',
				updatedAt: '2024-04-05T14:46:04.698436Z',
			},
			{
				id: '9618693e-5a2a-4cdf-914a-5304bbaee890',
				nameFr: 'Club sociaux',
				nameEn: 'Social Club',
				createdAt: '2024-04-05T14:46:04.698435Z',
				updatedAt: '2024-04-05T14:46:04.698435Z',
			},
		],
		error: null,
	};

	const responseData: ApiResponse<ActivityArea[]> = mockResponse;

	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
