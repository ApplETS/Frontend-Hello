'use server';

import { forgotPassword } from '@/utils/supabase/auth';

export async function forgotPasswordAction(formData: FormData) {
	await forgotPassword(formData);
}
