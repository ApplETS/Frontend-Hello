import { api } from '@/config';
import { getSession } from '@/utils/supabase/auth';

export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchWithSession(routeSuffix: string, method: Method, body: any = null) {
	// Get the current session, refreshes it if it's expired
	const session = await getSession();
	console.log('session', session);

	const fetchOptions: RequestInit = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + session?.access_token,
		},
	};

	if (body && method.toUpperCase() !== 'GET') {
		fetchOptions.body = JSON.stringify(body);
	}

	return fetch(`${api}/${routeSuffix}`, fetchOptions);
}
