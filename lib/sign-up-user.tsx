import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { User } from '@/models/user';

export async function signUpUser(email: string, organisation: string, activityArea: string): Promise<User> {
	const response = await fetchWithSession(`moderator/organizer`, Method.POST, {
		email: email,
		organisation: organisation,
		activityArea: activityArea,
	});

	if (!response.ok) {
		throw new Error('Failed to create user');
	}

	const responseData: ApiResponse<User> = await response.json();
	console.log(responseData);

	// Check for errors in response
	if (responseData.error) {
		throw new Error('Error in user creation');
	}

	return responseData.data;
}
