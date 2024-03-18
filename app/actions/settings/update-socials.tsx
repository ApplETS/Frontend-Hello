'use server';

import { updateSocials as updateSocialsServer } from '@/utils/supabase/auth';

export async function updateSocials(formData: FormData) {
	return await updateSocialsServer(formData);
}
