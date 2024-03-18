'use server';

import { revalidateTag } from 'next/cache';
import constants from '@/utils/constants';
import { patchPublications } from '../patch-publication';

export async function updatePublication(id: string, formData: FormData) {
	try {
		await patchPublications(id, formData);
	} catch (e) {
		return false;
	}

	revalidateTag(constants.tags.publications);
	return true;
}
