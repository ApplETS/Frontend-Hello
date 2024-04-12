'use server';

import { unsubscribe } from '../unsubscribe';

export async function unsubscribeFromOrganizer(token: string) {
	try {
		await unsubscribe(token);
		return true;
	} catch {
		return false;
	}
}
