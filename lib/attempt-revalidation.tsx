'use server';

import { revalidateTag } from 'next/cache';

export async function attemptRevalidation(tag: string) {
	// Revalidating a tag in a server action is usually enough.
	// However, the revalidation doesn't always happen immediately. This forces it.
	revalidateTag(tag);
}
