'use server';

import { signIn } from '@/utils/supabase/auth';

export async function signInAction(formData: FormData) {
	await signIn(formData);
}
