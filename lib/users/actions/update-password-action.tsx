'use server';

import { updatePassword } from '@/app/actions/settings/update-password';

export async function updatePasswordAction(formData: FormData) {
	await updatePassword(formData);
}
