import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';

export async function patchPublications(id: string, formData: FormData) {
	const response = await fetchWithSession(`organizer/events/${id}`, Method.PATCHFORM, formData);

	if (!response.ok) {
		throw new Error('Failed to fetch events');
	}
}
