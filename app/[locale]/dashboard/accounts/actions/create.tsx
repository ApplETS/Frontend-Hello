'use server';

import { signUpUser } from '@/lib/sign-up-user';
import { revalidateTag } from 'next/cache';

export async function createUser(formData: FormData) {
	const email = formData.get('email') as string;
	const organisation = formData.get('organisation') as string;
	const activityArea = formData.get('activity') as string;
	var user;

	try {
		user = await signUpUser(email, organisation, activityArea);
	} catch (e) {
		console.log(e);
	}

	if (user) {
		revalidateTag('users');
	}
}
