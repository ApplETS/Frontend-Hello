import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { User } from '@/models/user';

export async function signUpUser(email: string, organisation: string, activityArea: string): Promise<User> {
	const response = await fetchWithSession(`user/organizer`, Method.GET, {
		email: email,
		organisation: organisation,
		activityArea: activityArea,
	});

	if (!response.ok) {
		throw new Error('Failed to fetch events');
	}

	const responseData: ApiResponse<User> = await response.json();

	// Check for errors in response
	if (responseData.error) {
		throw new Error('Error in response data');
	}

	return responseData.data;
}
