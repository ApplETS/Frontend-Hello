'use server';

import { signUpUser } from '@/lib/users/sign-up-user';
import { User } from '@/models/user';
import Constants from '@/utils/constants';
import { revalidateTag } from 'next/cache';

export async function createUser(formData: FormData): Promise<User | undefined> {
	const email = formData.get('email') as string;
	const organization = formData.get('organization') as string;
	const activityArea = formData.get('activity') as string;
	var user;

	try {
		user = await signUpUser(email, organization, activityArea);
	} catch (e) {
		return;
	}

	revalidateTag(Constants.tags.users);
	return user;
}
