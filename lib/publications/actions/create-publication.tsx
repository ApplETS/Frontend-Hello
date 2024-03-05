'use server';

import { redirect } from 'next/navigation';
import { addPublication } from '../add-publication';
import { revalidateTag } from 'next/cache';
import constants from '@/utils/constants';

export async function createPublication(
	title: string,
	content: string,
	altText: string,
	imageUrl: string,
	state: number,
	publicationDate: string,
	eventStartDate: string,
	eventEndDate: string,
	tags: string[]
) {
	var publication;
	try {
		publication = await addPublication(
			title,
			content,
			altText,
			imageUrl,
			state,
			publicationDate,
			eventStartDate,
			eventEndDate,
			tags
		);
		console.log(publication);
	} catch (e) {
		console.log(e);
		return;
	}

	revalidateTag(constants.tags.publications);
	return publication;
}
