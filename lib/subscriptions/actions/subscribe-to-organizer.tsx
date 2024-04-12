'use server';

import { subscribe } from '../subscribe';

export async function subscribeToOrganizer(email: string) {
	try {
		await subscribe(email);
		return true;
	} catch {
		return false;
	}
}
