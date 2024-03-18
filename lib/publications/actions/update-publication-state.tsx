'use server';

import { revalidateTag } from 'next/cache';
import constants from '@/utils/constants';
import { patchPublications } from '../patch-publication';
import { NewsStates } from '@/models/news-states';
import { patchModeratorPublication } from '../patch-moderator-publication';

export async function updatePublicationState(id: string, newState: NewsStates, reason: string | null) {
	try {
		await patchModeratorPublication(id, newState, reason);
	} catch (e) {
		return false;
	}

	revalidateTag(constants.tags.approbations);
	return true;
}
