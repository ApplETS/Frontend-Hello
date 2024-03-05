'use server';

import { addPublication } from '../add-publication';
import { revalidateTag } from 'next/cache';
import constants from '@/utils/constants';

export async function createPublication(formData: FormData) {
	var publication;

	try {
		publication = await addPublication(formData);
	} catch (e) {
		return;
	}

	revalidateTag(constants.tags.publications);
	return publication;
}
