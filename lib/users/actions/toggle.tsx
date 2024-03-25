'use server';

import Constants from '@/utils/constants';
import { revalidateTag } from 'next/cache';
import { toggleUser } from '../toggle-user';

export async function toggleUserIsActive(userId: string, reason?: string) {
	try {
		await toggleUser(userId, reason);
	} catch (e) {
		return false;
	}

	revalidateTag(Constants.tags.users);
	return true;
}
