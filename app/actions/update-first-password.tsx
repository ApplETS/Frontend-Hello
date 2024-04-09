'use server';

import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { updateUserProfile } from '@/lib/update-profile';
import { updatePasswordSettings } from '@/utils/supabase/auth';

export async function updateFirstPassword(formData: FormData) {
	const userObject = await getAuthenticatedUser();
	userObject.hasLoggedIn = true;

	await updateUserProfile({
		...userObject,
		activityAreaId: userObject.activityArea?.id ?? '',
	});

	return await updatePasswordSettings(formData);
}
