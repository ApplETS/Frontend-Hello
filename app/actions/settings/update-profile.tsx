'use server';

import { updateProfile as updateProfileServer } from '@/utils/supabase/auth';

export async function updateProfile(formData: FormData) {
	return await updateProfileServer(formData);
}
