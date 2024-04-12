'use server';

import { draftPublication } from '../draft-publication';
import { revalidateTag } from 'next/cache';
import constants from '@/utils/constants';

export async function draftAPublication(formData: FormData, draftId?: string) {
	var publication;

	try {
		publication = await draftPublication(formData, draftId);
	} catch (e) {
		return;
	}

	revalidateTag(constants.tags.publications);
	return publication;
}
