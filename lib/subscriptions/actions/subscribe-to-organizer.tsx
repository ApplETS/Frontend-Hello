'use server';

import { subscribe } from '../subscribe';

export async function subscribeToOrganizer(email: string, organizerId: string) {
	try {
		await subscribe(email, organizerId);
		return true;
	} catch {
		return false;
	}
}
