'use server';

import { updatePassword } from '@/utils/supabase/auth';

export async function updatePasswordAction(formData: FormData) {
	await updatePassword(formData);
}
