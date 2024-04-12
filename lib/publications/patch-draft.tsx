import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';

export async function pathDraft(formData: FormData, id: string) {
	for (const [key, value] of Array.from(formData.entries())) {
		if (!value || value === 'Invalid Date') {
			formData.delete(key);
		}
	}

	const response = await fetchWithSession(`organizer-drafts/${id}`, Method.PATCHFORM, formData);

	if (!response.ok) {
		throw new Error('Failed to update the draft');
	}
}
