import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';
import { ApiResponse } from '@/models/api-response';
import { User } from '@/models/user';

export async function signUpUser(email: string, organization: string, activityAreaId: string): Promise<User> {
	const response = await fetchWithSession(`organizers`, Method.POST, {
		email: email,
		organization: organization,
		activityAreaId: activityAreaId,
	});

	if (!response.ok) {
		throw new Error('Failed to create user');
	}

	const responseData: ApiResponse<User> = await response.json();

	// Check for errors in response
	if (responseData.error) {
		throw new Error('Error in user creation');
	}

	return responseData.data;
}
