'use server';

import { revalidateTag } from 'next/cache';
import constants from '@/utils/constants';
import { deletePublication } from '../delete-publication';

export async function removePublication(id: string) {
	try {
		await deletePublication(id);
	} catch (e) {
		return false;
	}

	revalidateTag(constants.tags.publications);
	return true;
}
