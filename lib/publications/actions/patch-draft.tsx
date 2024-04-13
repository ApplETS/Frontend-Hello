'use server';

import { revalidateTag } from 'next/cache';
import constants from '@/utils/constants';
import { patchDraft } from '../patch-draft';

export async function patchADraft(formData: FormData, draftId: string) {
	var publication;

	try {
		publication = await patchDraft(formData, draftId);
	} catch (e) {
		return;
	}

	revalidateTag(constants.tags.publications);
	return true;
}
