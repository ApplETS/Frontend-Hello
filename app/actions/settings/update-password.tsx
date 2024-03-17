'use server';

import { updatePasswordSettings } from '@/utils/supabase/auth';

export async function updatePassword(formData: FormData) {
	return await updatePasswordSettings(formData);
}
