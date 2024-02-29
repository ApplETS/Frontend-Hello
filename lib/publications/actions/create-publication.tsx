'use server';

import { redirect } from 'next/navigation';
import { addPublication } from '../add-publication';

export async function createPublication(
	title: string,
	content: string,
	// altText: string,
	imageUrl: string,
	state: number,
	publicationDate: string,
	eventStartDate: string,
	// eventEndDate: string,
	tags: string[]
) {
	try {
		addPublication(
			title,
			content,
			imageUrl,
			1, // Jsp c quoi les state
			publicationDate,
			eventStartDate,
			// eventEndDate,
			tags
		);
	} catch (e) {
		redirect('dashboard'); // TODO : Change
		return;
	}
}
