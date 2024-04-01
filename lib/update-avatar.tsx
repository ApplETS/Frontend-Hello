import { fetchWithSession, Method } from '@/lib/fetch-with-refresh';

export async function updateAvatar(formData: FormData) {
	const response = await fetchWithSession(`me/avatar`, Method.PATCHFORM, formData);

	if (!response.ok) {
		throw new Error('Failed to patch avatar');
	}
}
